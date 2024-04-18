import data from "@/data.json";
import BookingDetails from "@/components/bookingDetails/BookingDetails";

export interface ISpaceDetailProps {
	params: {id: number};
}

export default async function SpaceDetail({params: {id}}: Readonly<ISpaceDetailProps>) {
	const hotelDetail = data.hotels.find((hotel) => hotel?.hotelId == id);

	return <>{hotelDetail ? <BookingDetails hotelDetail={hotelDetail} /> : "No Details"}</>;
}
