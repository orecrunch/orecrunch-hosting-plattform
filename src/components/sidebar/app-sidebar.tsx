"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {

  CreditCardIcon,
  Database,

  Folder,
  HelpCircle,
  Info,

  Server,
  Terminal,
  Users,
} from "lucide-react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { AppSideBarUser } from "./app-sidebar-user";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import { Suspense, use, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { UserData } from "@/models/sidebar-userdata";
import { Skeleton } from "../ui/skeleton";
let navbar = {
  main: {
    title: "Application",
    availabe: "/app",
    items: [
      {
        title: "Home",
        url: "/app",
        strict: true,
        icon: Home,
      },
      {
        title: "Servers",
        url: "/app/servers",
        icon: Server,
      },
      {
        title: "Payment",
        url: "/app/payment",
        icon: CreditCardIcon,
      },

      {
        title: "Settings",
        url: "/app/settings",
        icon: Settings,
      },
    ],
  },
  server: {
    title: "Server",
    availabe: "/app/servers/*",
    items: [
      {
        title: "Console",
        url: "console",
        icon: Terminal,
      },
        {
        title: "Files",
        url: "files",
        icon: Folder,
      },
      {
        title: "Database",
        url: "files",
        icon: Database,
      },
      {
        title: "Users",
        url: "users",
        icon: Users,
      },

      {
        title: "Settings",
        url: "settings",
        icon: Settings,
      },
    ],
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>();

  async function getUserData(): Promise<UserData> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    const email = data.session?.user.email ?? "";
    const metadata = data.session?.user.user_metadata ?? {};

    return {
      avatar: metadata["picture"] ?? metadata["avatar_url"] ?? "",
      email: email,
      name: metadata["name"] ?? email,
    };
  }

  function isActive(item_url: string): boolean {
    return pathname.endsWith(item_url);
  }

  useEffect(() => {
    getUserData()
      .then((data) => setUserData(data))
      .catch((e) => toast(e.message));
  }, []);

  const entries = Object.entries(navbar);
  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>
          
              <div className="flex gap-2 m-2 mt-4">
                <Image src={Logo} alt={""} className="!size-6" />
                <span className="text-base font-semibold">OreCrunch.</span>
              </div>
      
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {entries.map((entry) => {
          if (!pathname.startsWith(entry[1].availabe.replaceAll("*", ""))) {
            return null;
          }
          return (
            <SidebarGroup key={entry[0]}>
              <SidebarGroupLabel>{entry[1].title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {entry[1].items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <a onClick={() => router.push(item.url)}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <a href="#">
                <HelpCircle />
                <span>Get Help</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="#">
                <Info />
                <span>Terms of Service</span>
              </a>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSideBarUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
