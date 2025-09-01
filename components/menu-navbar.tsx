import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import AlertDialogLogout from "./alert-dialog-logout";

export default function MenuNavbar({ isAdmin }: { isAdmin?: boolean }) {
  return (
    <DropdownMenuContent className="w-[224px] font-archivo font-normal text-sm">
      <a href={`${isAdmin ? "/dashboard/" : ""}/profile`}>
        <DropdownMenuItem>My Account</DropdownMenuItem>
      </a>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="text-red-500 cursor-pointer w-full justify-start"
            variant={"ghost"}
          >
            <LogOut className="text-red-500" /> Log Out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogLogout />
      </AlertDialog>
    </DropdownMenuContent>
  );
}
