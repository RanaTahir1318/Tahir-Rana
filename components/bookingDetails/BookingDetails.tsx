"use client";
import Image from "next/image";
import style from "./BookingDetails.module.css";
import {useEffect, useState} from "react";
import BookingModal from "../bookingModal/BookingModal";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {IHotel} from "@/types/type";
import {useSession} from "next-auth/react";

export interface IBookingDetailsProps {
	hotelDetail?: IHotel;
	hotelId?: number;
}
export default function BookingDetails({hotelDetail, hotelId}: Readonly<IBookingDetailsProps>) {
	console.log("hotelId", hotelId);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [hotel, setHotel] = useState<IHotel>({} as IHotel);
	console.log("hotel", hotel);
	const {data: session} = useSession();
	const myBookings = localStorage.getItem(`bookings_${session?.user?.email}`);

	useEffect(() => {
		if (myBookings && hotelId) {
			const parsedBookings = JSON.parse(myBookings);
			setHotel(parsedBookings.find((booking: IHotel) => booking?.hotelId == hotelId));
		} else {
			setHotel(hotelDetail ?? ({} as IHotel));
		}
	}, [myBookings]);

	return (
		<>
			<main className={style.main}>
				<div className={style.container}>
					<div className={style.product_detail_head}>
						<Image src={hotel?.thumbNailUrl ?? ""} alt="hotel" width={500} height={500} />
					</div>
					<div className={style.pro_title}>
						<h1>{hotel?.name ?? ""}</h1>
					</div>
					<div className={style.detail_tp_bar}>
						Type: <span className={`btn ${style.category}`}>{hotel?.type ?? ""}</span>
						<div className={style.rating_tag}>
							Rating: <strong className={style.rating_value}>{hotel?.hotelRating ?? ""}</strong>
							<i className="ico ico_star-icon"></i>
						</div>
					</div>
					<div className={style.address_bar}>
						<div className={style.location_pin}>
							<i className="ico ico_pin-location"></i>
							<span>
								Address: {hotel?.address1 ?? ""}, {hotel?.city ?? ""}
							</span>
						</div>
					</div>

					<div className={style.product_inner}>
						<div className={style.pro_lft_col}>
							<div className={style.main_box}>
								<div className={style.box_head}>
									<h2>
										Description<i className="down-arrow ico_down-rounded"></i>
									</h2>
								</div>
								<div className={style.box_body}>
									<div className={style.body_inner}>
										<p>{hotel?.shortDescription ?? ""}</p>
									</div>
								</div>
							</div>
						</div>
						{hotel?.payment_status !== "confirmed" ? (
							<button type="button" className={`btn ${style.book_btn}`} onClick={() => setShowModal(!showModal)}>
								Book Now
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</main>
			{showModal && hotel?.payment_status !== "confirmed" && (
				<Elements stripe={loadStripe(process.env.stripe_public_key!)}>
					<BookingModal hotelDetail={hotel} setShowModal={setShowModal} />
				</Elements>
			)}
		</>
	);
}
