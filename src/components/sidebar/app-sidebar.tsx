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
  Command,
  CreditCardIcon,
  FileQuestionIcon,
  FileUpIcon,
  HelpCircle,
  Info,
  Link,
  Plus,
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
const navbar = {
  main: [
    {
      title: "Home",
      url: "/app",
      icon: Home,
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
 
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>();

  async function getUserData(): Promise<UserData> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    const email = data.session?.user.email ?? ""
    const metadata = data.session?.user.user_metadata ?? {}

    return {
      avatar: metadata["picture"] ?? metadata["avatar_url"] ?? "",
      email: email,
      name: metadata["name"] ?? email,
    };
  }

  useEffect(() => {
    getUserData()
      .then((data) => setUserData(data))
      .catch((e) => toast(e.message));
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 "
            >
              <div>
                <Image src={Logo} alt={""} className="!size-6" />
                <span className="text-base font-semibold">OreCrunch.</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbar.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
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
