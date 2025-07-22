import type React from "react";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      <AppSidebar />
      {/* Main content with left margin for desktop sidebar */}
      <div className="lg:pl-64">{children}</div>
    </div>
  );
}
