"use client";

import {useRef, useState} from "react";
import style from "./UsersComponent.module.css";
import {formatDate} from "@/utils/date";
import Loader from "../loader/Loader";
export interface IUsersComponentProps {}

export default function UsersComponent(props: IUsersComponentProps) {
	const [users, setUsers] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [weather, setWeather] = useState<string>("");
	const [searchedInput, setSearchedInput] = useState<string>("");
	const [errors, setErrors] = useState<any>({
		name: false,
		email: false,
		city: false,
		searchName: false,
	});
	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const cityRef = useRef<HTMLInputElement>(null)

	const getUsers = async () => {
		const date = new Date();
		const formattedDate = formatDate(date);
const isSearchValid = searchedInput !== "";
setErrors({...errors, searchName: !isSearchValid})
		if(isSearchValid){
			setIsLoading(true)
			try {
				const res = await fetch(`http://localhost:3001/api/users/${searchedInput}`, {
					method: "GET",
				});
				if (res.body) {
					const results = await res.json();
					if (results.error || results.length === 0) {
						setError("No User Found!");
						setIsLoading(false);
						return;
					}
		
					const weatherResponse = await fetch(
						`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${results[0]?.city}&dt=${formattedDate}`
					);
					const weather = await weatherResponse.json();
					setWeather(weather?.current?.temp_c);
					setUsers(results);
					setIsLoading(false);
				}	
				}		
				catch (error) {
					console.error(error);
				}	
			}
	};
	const handleSearchUser = async (e: any) => {
		e.preventDefault();
		setSearchedInput(e.target.value);
		if(searchedInput) {
			setErrors({...errors, searchName: false})
		}
	};

	const addCustomer = async () => {
		
		const name = nameRef.current?.value
const 		email = emailRef.current?.value
const		city = cityRef.current?.value

const isValidName = nameRef.current?.value !== "";
const isEmailName = emailRef.current?.value !== "";
const isCityName = cityRef.current?.value !== "";

setErrors({
	name: !isValidName,
	email: !isEmailName,
	city: !isCityName,
});
if(isValidName && isEmailName && isValidName) {
	setIsLoading( true);
	try {

		const res = await fetch(`http://localhost:3001/api/create-customer`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				city
			}),
		})
		if (res.ok) {
			setIsLoading(false);
			if(nameRef.current && emailRef.current && cityRef.current) {
			nameRef.current.value = ""			;
		emailRef.current.value = "";
		cityRef.current.value = "";}
		}	
	} catch (error) {
		console.error(error);
	}	
}
	};
	return (
		<>{
			isLoading && <Loader />
		}
		<div className={style.container}>
			<h4 className={style.title}>Add Customer</h4>
			<div className={style.input_container}>
				<span>

				<input
				ref={nameRef}
					type="text"
					placeholder="your name"
					className={style.inputField}
					id="name"
					required={true}
					onChange={() => errors.name && setErrors({...errors, name: false})}
				/>
					{errors.name && <p className={style.error}>Name is Required!</p>}
				</span>
				<span>

				<input
				ref={emailRef}
					type="email"
					placeholder="your email"
					className={style.inputField}
					id="email"
					required={true}
					onChange={() => errors.name && setErrors({...errors, email: false})}
				/>
					{errors.email && <p className={style.error}>Email is Required!</p>}
				</span>
				<span>

				<input
				ref={cityRef}
					type="text"
					placeholder="your city"
					className={style.inputField}
					id="city"
					required={true}
					onChange={() => errors.city && setErrors({...errors, city: false})}
				/>
					{errors.name && <p className={style.error}>City is Required!</p>}
				</span>
				<button type="button" className={style.button} onClick={addCustomer} disabled={isLoading}>
					ADD
				</button>

			</div>
			<h4 className={style.title}>Search User</h4>
			<div className={style.input_container}>
				<span>

				<input
					type="text"
					placeholder="Search User"
					className={style.inputField}
					onChange={(e) => handleSearchUser(e)}
					value={searchedInput}
					required={true}
				/>
				{errors.searchName && <p className={style.error}>Field cannot be empty!</p>}
				</span>
				<button type="button" className={style.button} onClick={getUsers} disabled={isLoading}>
					Search
				</button>
				<button
					type="button"
					className={style.button}
					style={{backgroundColor: "violet"}}
					onClick={() => {
						setError(() => "");
						setSearchedInput("");
						setUsers([]);
					}}
				>
					Clear
				</button>
			</div>
			{users.length > 0 ? (
				<div>
					{users?.map((user: any) => (
						<div key={user.id} className={style.userContainer}>
							<span>Name: {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}</span>
							<span>Email: {user.email}</span>
							<span>City: {user.city.slice(0, 1).toUpperCase() + user.city.slice(1)}</span>
							<span>
								Temperature: <span className={style.temperature}>{weather}°C</span>
							</span>
						</div>
					))}
				</div>
			) : (
				error && <div className={style.container}>{error}</div>
			)}
		</div>
		</>
	);
}
