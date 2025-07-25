import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function storePlaidItem({
  access_token,
  item_id,
  institution_name,
}: {
  access_token: string;
  item_id: string;
  institution_name: string | null;
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User must be logged in to store Plaid item");
  }

  const { error: insertError } = await supabase.from("plaid_items").insert({
    user_id: user.id,
    access_token,
    item_id,
    institution_name,
  });

  if (insertError) {
    throw insertError;
  }

  return { success: true };
}
