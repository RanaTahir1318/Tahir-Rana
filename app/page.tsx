import data from "@/data.json";
import style from "./page.module.css";
import {Card} from "@/components/Card/Card";
import Bookings from "@/components/bookings/Bookings";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/options";
import UsersComponent from "@/components/usersComponent/UsersComponent";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<main className={style.main}>
			{session && (
				<div className={style.cards_container}>
					<UsersComponent />
				</div>
			)}
			{session && (
				<div className={style.cards_container}>
					<Bookings session={session} />
				</div>
			)}
			<div>
				<h4>Hotels List</h4>
				<div className={style.cards_container}>
					{data.hotels.map((hotel) => (
						<Card key={hotel.hotelId} hotel={hotel} />
					))}
				</div>
			</div>
		</main>
	);
}
