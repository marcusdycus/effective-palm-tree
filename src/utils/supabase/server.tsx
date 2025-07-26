import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClientForServerAction() {
  const cookieStore = await cookies();

  const canSetCookies = typeof cookieStore.set === "function";

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          cookieStore?.getAll().map(({ name, value }) => ({ name, value })),
        setAll: canSetCookies
          ? (cookiesToSet) => {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore?.set(name, value, options as any)
              );
            }
          : () => {
              // noop to avoid crashes in read-only contexts
              return;
            },
      },
    }
  );
}
