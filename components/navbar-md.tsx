import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarMD() {
  return (
    <nav className="hidden md:flex justify-between py-[32px] px-[60px] absolute w-full z-10 top-0 left-0">
      {/* logo */}
      <img src="/logo/logo-putih.svg" alt="Logo" width={134} height={24} />

      {/* user profile */}
      <div className="gap-[6px] flex items-center">
        <Avatar className="h-[32px] w-[32px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-archivo text-base font-medium leading-[24px] underline text-white">
          Jamed Dean
        </p>
      </div>
    </nav>
  );
}
