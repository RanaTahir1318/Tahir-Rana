"use client";
export interface ICalendarComponentProps {
	dateRef: any;
	checkInRef: any;
	checkOutRef: any;
	errors: {
		date: boolean;
		checkIn: boolean;
		checkOut: boolean;
	};
	setErrors(errors: any): void;
}
import {useState} from "react";
import style from "./Calendar.module.css";

export default function CalendarComponent({
	dateRef,
	checkInRef,
	checkOutRef,
	errors,
	setErrors,
}: Readonly<ICalendarComponentProps>) {
	const [showDate, setShowDate] = useState<boolean>(false);
	return (
		<div className={style.mainBox}>
			<div className={style.boxBody}>
				<label htmlFor="date">Date </label>
				<input
					ref={dateRef}
					type="date"
					id="date"
					min={new Date().toISOString().split("T")[0]}
					onChange={() => {
						setShowDate(true);
						errors.date && setErrors({...errors, date: false});
					}}
					className={style.inputField}
					style={{cursor: "pointer"}}
				/>
				{errors.date && <p className={style.error}>Date is Required!</p>}
				{showDate && (
					<>
						<label htmlFor="check-in">Check In</label>
						<input
							type="time"
							id="check-in"
							ref={checkInRef}
							onChange={() => {
								errors.checkIn && setErrors({...errors, checkIn: false});
							}}
						/>
						{errors.checkIn && <p className={style.error}>Check In is Required!</p>}
						<label htmlFor="check-out">Check Out</label>
						<input
							type="time"
							id="check-out"
							ref={checkOutRef}
							onChange={() => {
								errors.checkOut && setErrors({...errors, checkOut: false});
							}}
						/>
						{errors.checkOut && <p className={style.error}>Check Out is Required!</p>}
					</>
				)}
			</div>
		</div>
	);
}
