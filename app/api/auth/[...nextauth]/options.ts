import type {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: "774946518951-if8ssdkr921foh09tt8tostm4lrl01qu.apps.googleusercontent.com",
			clientSecret: "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",
			allowDangerousEmailAccountLinking: true,
			authorization: `https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login`,
		}),
		// CredentialsProvider({
		// 	name: "Credentials",
		// 	credentials: {
		// 		email: {
		// 			label: "Email:",
		// 			type: "text",
		// 			placeholder: "Your Email",
		// 		},
		// 		password: {
		// 			label: "Password:",
		// 			type: "text",
		// 			placeholder: "Your Password",
		// 		},
		// 	},
		// 	async authorize(credentials) {
		// 		const user: any = {id: "42", email: "tahir.aslam.sixlogics@gmail.com", password: "123456"};

		// 		if (credentials?.email === user.email && credentials?.password === user.password) {
		// 			return user;
		// 		} else return null;
		// 	},
		// }),
	],
};
export default NextAuth(authOptions);
