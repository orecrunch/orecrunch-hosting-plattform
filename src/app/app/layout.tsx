import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import { Suspense } from "react";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="overflow-clip ">
          <SidebarTrigger className="absolute top-1.5 mx-1.5" />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
