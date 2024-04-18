"use client";

import {useEffect, useState} from "react";
import {Card} from "../Card/Card";
import {IUserType} from "@/types/type";
import style from "./Bookings.module.css";
export interface IBookingsProps {
	session?: IUserType;
}

export default function Bookings({session}: IBookingsProps) {
	const [bookings, setBookings] = useState<any[]>([]); // Specify the type according to your data structure

	useEffect(() => {
		const myBookings = localStorage.getItem(`bookings_${session?.user?.email}`);
		if (myBookings) {
			const parsedBookings = JSON.parse(myBookings);
			setBookings(parsedBookings);
		}
	}, []);
	if (bookings.length > 0) {
		return (
			<div style={{display: "flex", flexDirection: "column"}}>
				<h4>My Bookings</h4>
				<div className={style.cards_container}>
					{bookings.length > 0 &&
						bookings.map((booking, index) => (
							<div key={index}>
								<Card key={booking?.hotelId} hotel={booking} />
							</div>
						))}
				</div>
			</div>
		);
	}
}
