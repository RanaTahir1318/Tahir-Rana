import {query} from "@/utils/db";
import {NextRequest} from "next/server";
async function handler(req: NextRequest, context: any) {
	const {params} = context;
	try {
		const results = await query("SELECT * FROM customers");
		const result = results.filter((item: any) => item.name.toLowerCase() == params.name.toLowerCase());

		const response = new Response(JSON.stringify(result ?? []), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error: any) {
		const response = new Response(JSON.stringify({error: error.message}), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	}

	// case "POST":
	// 	try {
	// 		// const {name, email} = req.body;
	// 		// const results = await query("INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *", [name, email]);
	// 		// res.status(200).json(results);
	// 	} catch (error: any) {
	// 		// res.status(500).json({error: error.message});
	// 	}
	// 	break;
}

export {handler as GET, handler as POST};
