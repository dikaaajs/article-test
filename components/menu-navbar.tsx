import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function MenuNavbar() {
  return (
    <DropdownMenuContent className="w-[224px] font-archivo font-normal text-sm">
      <DropdownMenuItem>
        <a href="/profile">My Account</a>
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-500">
        <LogOut className="text-red-500" /> Log Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
