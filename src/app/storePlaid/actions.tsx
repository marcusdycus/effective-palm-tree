"use server";

import { createClientForServerAction } from "@/utils/supabase/server";

export async function storePlaidItem({
  access_token,
  item_id,
  institution_name,
}: {
  access_token: string;
  item_id: string;
  institution_name: string | null;
}) {
  const supabase = await createClientForServerAction();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.log(userError);
    console.log(user);
    throw new Error("User must be logged in to store Plaid item");
  }

  const { error: insertError } = await supabase.from("plaid_items").insert([
    {
      user_id: user.id,
      access_token,
      item_id,
      institution_name,
    },
  ]);

  if (insertError) {
    throw insertError;
  }

  return { success: true };
}
