"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserData } from "@/models/sidebar-userdata";
import { EllipsisVertical } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function AppSideBarUser({ user }: { user: UserData | undefined }) {
  const router = useRouter();
  function logOut() {
    const supabase = createClient();
    supabase.auth.signOut().then(() => router.refresh());
  }

  const { isMobile } = useSidebar();
  const loading = user ? false : true;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar hover:bg-transparent   data-[state=open]:text-sidebar-accent-foreground"
            >
              {loading ? (
                <Skeleton className="h-8 w-8 rounded-lg " />
              ) : (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user!.avatar} alt={user!.name} />
                  <AvatarFallback className="rounded-lg ">CN</AvatarFallback>
                </Avatar>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                {loading ? (
                  <Skeleton className="h-3" />
                ) : (
                  <span className="truncate font-medium">{user!.name}</span>
                )}
                {loading ? (
                  <Skeleton className="h-3 mt-1" />
                ) : (
                  <span className="text-muted-foreground truncate text-xs">
                    {user!.email}
                  </span>
                )}
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {loading ? (
                  <Skeleton className="h-8 w-8 rounded-lg" />
                ) : (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user!.avatar} alt={user!.name} />
                    <AvatarFallback className="rounded-lg ">CN</AvatarFallback>
                  </Avatar>
                )}

                <div className="grid flex-1 text-left text-sm leading-tight">
                  {loading ? (
                    <Skeleton className="h-3" />
                  ) : (
                    <span className="truncate font-medium">{user!.name}</span>
                  )}
                  {loading ? (
                    <Skeleton className="h-3 mt-1" />
                  ) : (
                    <span className="text-muted-foreground truncate text-xs">
                      {user!.email}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/app/account")}>
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/app/billing")}>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/app/settings")}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOut}>LogOut</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
