"use client";
import React from "react";
import axios from "axios";
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
import { toast } from "sonner";

interface DeleteButtonCategoryProps {
  id: string;
  name: string;
  onDeleted?: () => void; // callback ke parent
}

export default function DeleteButtonCategory({
  id,
  name,
  onDeleted,
}: DeleteButtonCategoryProps) {
  const handleDelete = async () => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST_API;
      const token = localStorage.getItem("token");

      await axios.delete(`${host}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Category "${name}" deleted ✅`);

      // refresh data di parent
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category ❌");
    }
  };

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
            Delete Category
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-normal">
            Delete category “{name}”? This will remove it from master data
            permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
