"use client";

import React, { useState } from "react";
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
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";

// schema validasi zod
const categorySchema = z.object({
  name: z.string().min(3, "Category must be at least 3 characters"),
});

export default function AddCategoryButton({
  onCategoryAdded,
}: {
  onCategoryAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // validasi
    const parsed = categorySchema.safeParse({ name });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const host = process.env.NEXT_PUBLIC_HOST_API;
      const token = localStorage.getItem("token");
      await axios.post(
        `${host}/categories`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // reset input setelah sukses
      setName("");
      toast.success("Category added successfully ✅");
      onCategoryAdded();
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Failed to add category. Please try again.");
      toast.error("Failed to add category. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus /> Add Category
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="font-archivo w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-slate-900 pb-[10px]">
            Add Category
          </AlertDialogTitle>
          <div className="grid gap-1 pb-[10px]">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="Input category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>
            )}
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
