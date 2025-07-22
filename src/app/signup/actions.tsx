"use server";

import { createClient } from "@/utils/supabase/server";

export async function signup(prevState: unknown, formData: FormData) {
  console.log(formData);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const supabase = await createClient();
  if (!name || !email || !password || !confirmPassword) {
    return { error: "missing-fields" };
  }

  if (password !== confirmPassword) {
    return { error: "password-mismatch" };
  }

  if (password.length < 8) {
    return { error: "password-too-short" };
  }

  try {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      return { error: "signup-failed" };
    }

    return { success: true };
  } catch (error) {
    console.error("Signup failed:", error);
    return { error: "signup-failed" };
  }
}
