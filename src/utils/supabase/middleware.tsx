import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const decodeSupabaseCookies = (
  cookies: ReturnType<NextRequest["cookies"]["getAll"]>
) => {
  return cookies.map(({ name, value }) => {
    // Decode base64-encoded JSON strings if needed
    if (value.startsWith("base64-")) {
      const base64 = value.replace("base64-", "");
      try {
        const json = JSON.parse(
          Buffer.from(base64, "base64").toString("utf-8")
        );
        return { name, value: JSON.stringify(json) };
      } catch {
        return { name, value }; // fallback
      }
    }
    return { name, value };
  });
};

export const encodeSupabaseCookies = (
  cookies: ({ name: string; value: string } & CookieOptions)[]
) => {
  return cookies.map(({ name, value, ...options }) => {
    // Encode JSON strings to base64 if needed
    try {
      const json = JSON.parse(value);
      return {
        name,
        value: "base64-" + Buffer.from(JSON.stringify(json)).toString("base64"),
        ...options,
      };
    } catch {
      return { name, value, ...options }; // fallback
    }
  });
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return decodeSupabaseCookies(request.cookies.getAll());
        },
        setAll(cookiesToSet) {
          const encodedCookies = encodeSupabaseCookies(cookiesToSet);
          supabaseResponse = NextResponse.next({
            request,
          });
          encodedCookies.forEach(({ name, value, ...options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
