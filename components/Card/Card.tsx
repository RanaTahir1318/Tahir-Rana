// Assuming Card.tsx is in the same directory as Card.module.css
import styles from "./Card.module.css"; // Import the CSS module
import {IHotel} from "@/types/type";
import Link from "next/link";

export interface ICardProps {
	hotel: IHotel;
}

export function Card({hotel}: Readonly<ICardProps>) {
	return (
		<div className={`${styles.product_card} ${styles.responsive_card}`}>
			<div className={styles.img_holder}>
				<img src={hotel?.thumbNailUrl} width={273} height={270} alt="Salle de formation" />
			</div>
			<Link
				href={
					hotel?.payment_status && (hotel?.payment_status === "confirmed" || hotel?.payment_status === "pending")
						? `/booked-space/${hotel?.hotelId}`
						: `/space-detail/${hotel?.hotelId}`
				}
				style={{textDecoration: "none"}}
			>
				<div className={styles.card_inner}>
					<div className={styles.rating_bar}>
						<div className={styles.rating_tag}>
							<strong className={styles.rating_value}>{hotel?.hotelRating}</strong>
							<i className="ico ico_start-icon" />
						</div>
						<span className={styles.category}>{hotel?.type}</span>
						{hotel?.payment_status && (
							<span
								className={styles.status}
								style={{backgroundColor: hotel?.payment_status === "confirmed" ? "green" : "red"}}
							>
								Payment: {hotel?.payment_status === "confirmed" ? "confirmed" : "pending"}
							</span>
						)}
						<span className={styles.forward_arrow}>
							<i className="ico_slider-next-arrow" />
						</span>
					</div>

					<div className={styles.card_descrip}>
						<h3>{hotel?.name}</h3>
						<p>{hotel?.shortDescription}</p>
					</div>
					<div className={styles.price_inf}>
						<strong className={styles.area}>{hotel?.locationDescription}</strong>
						<strong className={styles.pricing}>${hotel?.lowRate}</strong>
					</div>
				</div>
			</Link>
		</div>
	);
}
