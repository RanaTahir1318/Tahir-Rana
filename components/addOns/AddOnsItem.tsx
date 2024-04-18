import React from "react";
import style from "./AddOnsItem.module.css";

export interface IAddOnsItemProps {
	facility: string;
	handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function AddOnsItem({facility, handleCheckboxChange}: Readonly<IAddOnsItemProps>) {
	return (
		<div className={style.addOnsContainer}>
			<input
				type="checkbox"
				id={facility}
				className={style.addOnsCheckbox}
				onChange={(e) => handleCheckboxChange(e, facility)}
			/>
			<label htmlFor={facility} className={style.addOnsLabel}>
				{facility}
			</label>
		</div>
	);
}
