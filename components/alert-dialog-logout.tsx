import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AlertDialogLogout() {
  return (
    <AlertDialogContent className="font-archivo">
      <AlertDialogHeader>
        <AlertDialogTitle>Logout</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure want to logout?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
          }}
        >
          logout
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
