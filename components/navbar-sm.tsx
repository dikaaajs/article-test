"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuNavbar from "./menu-navbar";
import { Button } from "./ui/button";

export default function NavbarSM() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // ambil dari localStorage setelah komponen mount (client-side)
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setUsername(user.username || "");
    }
  }, []);

  return (
    <nav className="flex justify-between items-center py-[14px] md:py-[32px] px-[20px] md:px-[60px] border-b-[1px] border-slate-200">
      <Link href="/">
        <Image src="/logo/logo.svg" alt="Logo" width={122} height={22} />
      </Link>

      {/* user profile */}
      {username === "" ? (
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="gap-[6px] flex items-center">
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-archivo text-base font-medium leading-[24px] underline text-slate-900 hidden md:block">
                {username}
              </p>
            </div>
          </DropdownMenuTrigger>
          <MenuNavbar />
        </DropdownMenu>
      )}
    </nav>
  );
}
