"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    error,
    data: { user, session },
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }
  // Check if user has completed onboarding (this would come from your database)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!profile || !profile.completed_onboarding) {
    redirect("/onboarding");
  } else if (user && session) {
    redirect("/dashboard");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  // Redirect to onboarding for new users

  if (error) {
    redirect("/error");
  }

  revalidatePath("/onboarding", "layout");
  redirect("/onboarding");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
