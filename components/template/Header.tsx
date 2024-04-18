"use client";
import Link from "next/link";
import style from "./Header.module.css";
import {useRouter} from "next/navigation"; // Corrected import for useRouter
import {signIn, signOut, useSession} from "next-auth/react";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
	const {data, status} = useSession();
	const router = useRouter();

	const handleLogin = () => {
		signIn();
	};

	const handleLogout = () => {
		signOut().then(() => {
			localStorage.removeItem("bookings");
			router.push("/");
		});
	};
	const handleSignUp = () => {
		router.push("/signup");
	};

	return (
		<header className={style.header}>
			<nav>
				<ul className={style.links}>
					<li className={style.link}>
						<Link href={"/"}>Home</Link>
					</li>
					{status === "loading" ? (
						<li className={style.link}>Authenticating...</li>
					) : status !== "authenticated" ? (
						<>
							{" "}
							<li
								className={style.link}
								tabIndex={0}
								onClick={handleLogin}
								onKeyDown={(e) => e.key === "Enter" && handleLogin()}
							>
								Login
							</li>
							{/* <li className={style.link} tabIndex={0} onClick={handleSignUp}>
								Sign Up
							</li> */}
						</>
					) : (
						<li
							className={style.link}
							tabIndex={0}
							onClick={handleLogout}
							onKeyDown={(e) => e.key === "Enter" && handleLogout()}
						>
							Log Out
						</li>
					)}
					{status === "authenticated" && <span className={style.link}>{data?.user?.name}</span>}
				</ul>
			</nav>
		</header>
	);
}
