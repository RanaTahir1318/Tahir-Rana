"use client";
import {useRef, useState} from "react";
import AddOns from "../addOns/AddOns";
import CalendarComponent from "../calendarComponent/Calendar";
import style from "./BookingModal.module.css";
import {validateCheckIn, validateCheckOut} from "@/utils/validators";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Stripe from "stripe";
import {IHotel} from "@/types/type";
import Loader from "../loader/Loader";

export interface IBookingModalProps {
	hotelDetail?: IHotel;
	setShowModal: (showModal: boolean) => void;
}

const stripe1 = new Stripe(
	"sk_test_51P6T0UP4LSgAaD4DEHhETWAaWR60fPTUiuCa6iSKnFDUvKbXqd3p5vm3h250kcVSUBuoA4SMBWydZcuHC8he7TO000sHOh5YAF",
	{
		typescript: true,
		apiVersion: "2024-04-10",
	}
);

export default function BookingModal({hotelDetail, setShowModal}: Readonly<IBookingModalProps>) {
	const {data: session, status} = useSession() as {data: any; status: string};
	const stripe = useStripe();
	const elements = useElements();
	const cardElement = elements?.getElement("card");

	const router = useRouter();
	const nameRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const checkInRef = useRef<HTMLInputElement>(null);
	const checkOutRef = useRef<HTMLInputElement>(null);
	const [checkedItems, setCheckedItems] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<any>({
		name: false,
		date: false,
		checkIn: false,
		checkOut: false,
	});

	const handleSubmit = async () => {
		if (status !== "authenticated") {
			router.push(`/api/auth/signin?callbackUrl=/space-detail/${hotelDetail?.hotelId}`);
			return;
		}

		const isValidName = nameRef.current?.value !== "";
		const isValidDate = dateRef.current?.value != "";
		const isValidCheckIn = validateCheckIn(checkInRef.current?.value ?? "", dateRef.current?.value ?? "");
		const isValidCheckOut = validateCheckOut(checkInRef.current?.value!, checkOutRef.current?.value!);

		setErrors({
			name: !isValidName,
			date: !isValidDate,
			checkIn: !isValidCheckIn,
			checkOut: !isValidCheckOut,
		});

		if (isValidName && isValidDate && isValidCheckIn && isValidCheckOut) {
			try {
				if (!stripe || !cardElement) return;
				setIsLoading(true);
				const customer = await stripe1.customers.create({
					name: nameRef.current?.value,
					email: session?.user?.email,
				});
				const {paymentMethod} = await stripe.createPaymentMethod({
					type: "card",
					card: cardElement,
				});

				if (paymentMethod?.created && hotelDetail ) {
					const paymentIntent = await stripe1.paymentIntents.create({
						amount: parseInt(hotelDetail?.lowRate.toFixed(0)) ?? 0,
						currency: "usd",
						payment_method_types: ["card"],
						description: hotelDetail?.name,
						customer: customer.id,
						payment_method: paymentMethod.id,
					});

					if (paymentIntent.client_secret) {
						const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
							payment_method: paymentMethod.id,
						});

						if (result.paymentIntent?.status === "succeeded") {
							const existingBookings = JSON.parse(localStorage.getItem(`bookings_${session?.user?.email}`) ?? "[]");
							const newBooking = {
								...hotelDetail,
								checkIn: checkInRef.current?.value,
								checkOut: checkOutRef.current?.value,
								facilities: checkedItems,
								date: dateRef.current?.value,
								payment_status: "confirmed",
								userName: nameRef.current?.value,
							};
							existingBookings.push(newBooking);
							localStorage.setItem(`bookings_${session?.user?.email}`, JSON.stringify(existingBookings));
							setShowModal(false);
							setIsLoading(false);
						} else {
							const existingBookings = JSON.parse(localStorage.getItem(`bookings_${session?.user?.email}`) ?? "[]");
							const newBooking = {
								...hotelDetail,
								checkIn: checkInRef.current?.value,
								checkOut: checkOutRef.current?.value,
								facilities: checkedItems,
								date: dateRef.current?.value,
								payment_status: "pending",
								userName: nameRef.current?.value,
							};
							existingBookings.push(newBooking);
							localStorage.setItem(`bookings_${session?.user?.email}`, JSON.stringify(existingBookings));
							alert("Payment Failed");
						}
					}
				} else {
					const existingBookings = JSON.parse(localStorage.getItem(`bookings_${session?.user?.email}`) ?? "[]");
					const newBooking = {
						...hotelDetail,
						checkIn: checkInRef.current?.value,
						checkOut: checkOutRef.current?.value,
						facilities: checkedItems,
						date: dateRef.current?.value,
						payment_status: "pending",
						userName: nameRef.current?.value,
					};
					existingBookings.push(newBooking);
					localStorage.setItem(`bookings_${session?.user?.email}`, JSON.stringify(existingBookings));
					alert("Payment Failed");
					setIsLoading(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		}
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className={style.modalOverlay}>
				<div style={{position: "relative"}}>
					<span className={style.cross_icon} onClick={() => setShowModal(false)}>
						x
					</span>{" "}
					<form className={style.bookingForm}>
						<label htmlFor="name" className={style.label}>
							Name:
						</label>
						<input
							type="text"
							id="name"
							className={style.inputField}
							ref={nameRef}
							onChange={() => errors.name && setErrors({...errors, name: false})}
						/>
						{errors.name && <p className={style.error}>Name is Required!</p>}

						<CalendarComponent
							dateRef={dateRef}
							checkInRef={checkInRef}
							checkOutRef={checkOutRef}
							errors={errors}
							setErrors={setErrors}
						/>

						<AddOns
							facilities={hotelDetail?.facilities ?? []}
							checkedItems={checkedItems}
							setCheckedItems={setCheckedItems}
						/>
						<div className={style.cardDetails}>Card Details</div>
						<div className={style.cardElement}>
							<CardElement />
						</div>
						<button type="button" className={style.button} onClick={() => handleSubmit()} disabled={isLoading}>
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
