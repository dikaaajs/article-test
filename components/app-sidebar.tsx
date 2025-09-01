"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { FileText, FolderKanban, LogOut } from "lucide-react"; // contoh icon

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import AlertDialogLogout from "./alert-dialog-logout";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";

const data = {
  navMain: [
    {
      title: "",
      url: "#",
      items: [
        {
          title: "Articles",
          url: "/dashboard/articles",
          icon: FileText,
        },
        {
          title: "Category",
          url: "/dashboard/category",
          icon: FolderKanban,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <a href="/dashboard" className="py-[10px] px-[10px]">
          <img src="/logo/logo-putih.svg" alt="" />
        </a>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="font-archivo">
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((child) => {
                  const isActive = pathname === child.url;
                  const Icon = child.icon;

                  return (
                    <SidebarMenuItem key={child.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <a href={child.url} className="flex items-center gap-2">
                          {Icon && <Icon size={16} />}
                          <span>{child.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

                {/* Logout */}
                <SidebarMenuItem key={"logout"}>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2 ">
                          <LogOut size={16} />
                          <span>Logout</span>
                        </a>
                      </SidebarMenuButton>
                    </AlertDialogTrigger>
                    <AlertDialogLogout />
                  </AlertDialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
