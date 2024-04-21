  import { post } from "@/utils/db";
  import { NextRequest } from "next/server";


  async function handler(req: NextRequest) {

      try {
          const { name, email, city }: any = await req.json();

          const result = await post("INSERT INTO customers(name, email, city) VALUES ($1, $2, $3) RETURNING *", [name, email, city]);
          

          const response = new Response(JSON.stringify(result ?? []), {
              status: 200,
          });
          return response;
      } catch (error: any) {
          // Handle the error, log it, or send an appropriate error response
          console.error(error);
          return new Response("Internal Server Error", {
              status: 500,
              headers: {
                  "Content-Type": "text/plain",
              },
          });
      }
  }

  export { handler as POST };