/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
		stripe_secret_key: process.env.STRIPE_SECRET_KEY,
		google_client_id: process.env.GOOGLE_CLIENT_ID,
		google_secret_id: process.env.GOOGLE_SECRET_ID,
		auth_secret: process.env.AUTH_SECRET,
	},
};

export default nextConfig;
