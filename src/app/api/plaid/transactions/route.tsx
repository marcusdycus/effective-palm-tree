import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
      "PLAID-SECRET": process.env.PLAID_SECRET!,
    },
  },
});

const plaid = new PlaidApi(config);

export async function POST(req: Request) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { access_token, plaid_item_id } = await req.json();

  const today = new Date();
  const start = new Date(today);
  start.setMonth(start.getMonth() - 1); // last 30 days

  try {
    const response = await plaid.transactionsGet({
      access_token,
      start_date: start.toISOString().split("T")[0],
      end_date: today.toISOString().split("T")[0],
      options: { count: 50 },
    });

    const transactions = response.data.transactions.map((tx) => ({
      transaction_id: tx.transaction_id,
      user_id: user.id,
      plaid_item_id,
      name: tx.name,
      amount: tx.amount,
      category: tx.category,
      date: tx.date,
      pending: tx.pending,
    }));

    const { error } = await supabase.from("transactions").upsert(transactions, {
      onConflict: "transaction_id",
    });

    if (error) throw error;

    return NextResponse.json({ inserted: transactions.length });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
