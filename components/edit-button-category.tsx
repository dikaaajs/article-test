"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface EditButtonCategoryProps {
  id: string;
  name: string;
  onUpdated?: () => void; // callback ke parent
}

export default function EditButtonCategory({
  id,
  name,
  onUpdated,
}: EditButtonCategoryProps) {
  const [newName, setNewName] = useState(name);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const host = process.env.NEXT_PUBLIC_HOST_API;
      const token = localStorage.getItem("token");

      await axios.put(
        `${host}/categories/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Category updated ✅`);

      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          className="text-blue-600 underline p-0"
          size="sm"
        >
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-archivo w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-slate-900">
            Edit Category
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid gap-2 py-4">
          <Label htmlFor="category">Category Name</Label>
          <Input
            id="category"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-600"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
