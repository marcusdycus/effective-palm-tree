import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClientForServerAction } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const supabaseResponse = await updateSession(request);
  if (supabaseResponse?.error) {
    console.error("Error updating session:", supabaseResponse.error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const supabase = await createClientForServerAction();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const {
    data: { profile },
  } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  if (!profile || !profile.completed_onboarding) {
    console.log("Profile not found or not completed onboarding");
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|/signup/confirm|/login|/signup|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
