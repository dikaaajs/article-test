import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import MenuNavbar from "./menu-navbar";

export default function NavbarSM() {
  return (
    <nav className="flex justify-between py-[14px] md:py-[32px] px-[20px] md:px-[60px] border-b-[1px] border-slate-200">
      <Link href="/">
        <Image src="/logo/logo.svg" alt="Logo" width={122} height={22} />
      </Link>

      {/* user profile */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="gap-[6px] flex items-center">
            <Avatar className="h-[32px] w-[32px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-archivo text-base font-medium leading-[24px] underline text-slate-900 hidden md:block">
              Jamed Dean
            </p>
          </div>
        </DropdownMenuTrigger>
        <MenuNavbar />
      </DropdownMenu>
    </nav>
  );
}
