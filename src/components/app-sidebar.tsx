"use server";

import { userAgent } from "next/server";
import { headers } from "next/headers";
import { MobileMenu } from "./mobile-sidebar";
import { DesktopSidebar } from "./desktop-sidebar";
import { createClientForServerAction } from "@/utils/supabase/server";

// Main Sidebar Export
export async function AppSidebar() {
  const supabase = await createClientForServerAction();

  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return <></>;
  }
  const { device } = await userAgent({ headers: await headers() });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  return <>{deviceType === "desktop" ? <DesktopSidebar user={user} /> : ""}</>;
}

// Mobile Menu Trigger Export (for use in header)
export async function MobileMenuTrigger() {
  return <MobileMenu />;
}
