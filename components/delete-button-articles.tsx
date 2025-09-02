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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function DeleteButtonArticles({
  id,
  onUpdated,
}: {
  id: number;
  onUpdated: any;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="text-red-500 underline p-0" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-archivo">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-slate-900">
            Delete Articles
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-normal">
            Deleting this article is permanent and cannot be undone. All related
            content will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={async () => {
              try {
                const host = process.env.NEXT_PUBLIC_HOST_API;
                const token = localStorage.getItem("token");
                await axios.delete(`${host}/articles/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                toast.success("berhasil menghapus article");
                onUpdated();
              } catch (error) {
                console.error("Delete failed:", error);
                toast.error("gagal menghapus article");
              }
            }}
          >
            delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
