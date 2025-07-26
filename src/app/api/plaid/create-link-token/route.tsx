// app/api/plaid/create-link-token/route.ts
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

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

export async function GET(req: Request) {
  const cookieStore = await cookies();
  // Get authenticated user

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user?.id!,
      },
      client_name: "FinTrakr",
      products: (process.env.PLAID_PRODUCTS || "auth,transactions").split(
        ","
      ) as any,
      country_codes: (process.env.PLAID_COUNTRY_CODES || "US").split(
        ","
      ) as any,
      language: "en",
    });

    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error: any) {
    console.error("Plaid error:", error?.response?.data || error);
    return NextResponse.json(
      { error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
