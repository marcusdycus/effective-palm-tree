"use server";

import { userAgent } from "next/server";
import { headers } from "next/headers";
import { MobileMenu } from "./mobile-sidebar";
import { DesktopSidebar } from "./desktop-sidebar";

// Main Sidebar Export
export async function AppSidebar() {
  const { device } = await userAgent({ headers: await headers() });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  console.log(deviceType);
  return <>{deviceType === "desktop" ? <DesktopSidebar /> : <MobileMenu />}</>;
}

// Mobile Menu Trigger Export (for use in header)
export async function MobileMenuTrigger() {
  return <MobileMenu />;
}
