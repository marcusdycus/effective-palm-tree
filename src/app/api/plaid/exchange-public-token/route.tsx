import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
      "PLAID-SECRET": process.env.PLAID_SECRET!,
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function POST(req: Request) {
  const { public_token } = await req.json();

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    return NextResponse.json({ accessToken, itemId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
