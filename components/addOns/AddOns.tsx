"use client";
import {ChangeEvent, useState} from "react";
import AddOnsItem from "./AddOnsItem";

export interface IAddOnsProps {
	facilities: string[];
	checkedItems: string[];
	setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AddOns({facilities, checkedItems, setCheckedItems}: IAddOnsProps) {
	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
		const {checked} = event.target;
		if (checked) {
			setCheckedItems([...checkedItems, value]);
		} else {
			setCheckedItems(checkedItems.filter((item) => item !== value));
		}
	};

	return facilities.map((facility) => (
		<AddOnsItem key={facility} facility={facility} handleCheckboxChange={handleCheckboxChange} />
	));
}
