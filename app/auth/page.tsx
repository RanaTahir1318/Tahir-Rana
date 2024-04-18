import * as React from "react";

export interface IAuthenticationProps {}

export default function Authentication(props: IAuthenticationProps) {
	return (
		<div>
			Login Form
			<div>
				<label htmlFor="email">Email</label>
				<input type=" text" id="email" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type=" text" id="password" />
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</div>
	);
}
