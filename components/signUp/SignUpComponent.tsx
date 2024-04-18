"use client";

import {useRef} from "react";

export interface ISignUpComponentProps {}

export default function SignUpComponent(props: ISignUpComponentProps) {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const handleSubmit = () => {
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const confirmPassword = confirmPasswordRef.current?.value;
		const existingUsers = localStorage.getItem("users");

		const newUser = {
			id: existingUsers?.length! + 1 || 1,
			name: name,
			email: email,
			password: password,
		};
		const isExisted = existingUsers?.includes(newUser.email!);
		if (isExisted) {
			alert("User already exists");
			return;
		}
		if (!existingUsers) {
			localStorage.setItem("users", JSON.stringify([newUser]));
		} else {
			const users = JSON.parse(existingUsers);
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
		}
	};

	return (
		<div>
			<div>Create Your Account</div>
			<form>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" ref={nameRef} />
				<label htmlFor="email">Email</label>
				<input type="email" id="email" ref={emailRef} />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" ref={passwordRef} />
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input type="password" id="confirmPassword" ref={confirmPasswordRef} />
				<button type="submit" onClick={handleSubmit}>
					Sign Up
				</button>
			</form>
		</div>
	);
}
