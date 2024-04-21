import pg from "pg";

const {Client, Pool} = pg;

const client = new Pool({
	user: "postgres",
	host: "localhost",
	database: "test",
	password: "123456",
	port: 5432,
});

export async function query(text) {
	await client.connect();
	const res = await client.query(text);

	return res.rows;
}

export async function post(text,params) {
	await client.connect();
	const res = await client.query(text,params);

	return res.rows;
}
