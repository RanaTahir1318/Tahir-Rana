import BookingDetails from "@/components/bookingDetails/BookingDetails";

export interface IBookedSpaceProps {
	params: {id: number};
}

export default async function BookedSpace({params: {id}}: Readonly<IBookedSpaceProps>) {
	return <>{id ? <BookingDetails hotelId={id} /> : "No Details"}</>;
}
