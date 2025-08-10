import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";


export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider className="">
        <AppSidebar    className="h-full dark:bg-background bg-accent" />
        <div className=" dark:bg-background bg-accent w-full rounded-xl">
          <SidebarTrigger className=" sticky top-1 p-2 bg-transparent backdrop-blur-lg " />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
