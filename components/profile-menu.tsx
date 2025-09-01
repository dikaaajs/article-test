import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuNavbar from "./menu-navbar";

export default function ProfileMenu({
  avatarUrl,
  name,
  isAdmin = false,
}: {
  avatarUrl?: string;
  name?: string;
  isAdmin?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="gap-[6px] flex items-center">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-archivo text-base font-medium leading-[24px] underline text-black hidden md:block">
            {name || "User Name"}
          </p>
        </div>
      </DropdownMenuTrigger>
      <MenuNavbar isAdmin={isAdmin} />
    </DropdownMenu>
  );
}
