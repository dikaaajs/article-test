"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";

interface Category {
  id: string;
  name: string;
}

interface SelectCategoryProps {
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
}

export default function SelectCategory({
  onChange,
  className = "",
  value,
}: SelectCategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const host = process.env.NEXT_PUBLIC_HOST_API;
      try {
        const res = await axios.get(`${host}/categories`);
        const validCategories = (res.data.data || []).filter(
          (cat: Category) => cat.id && cat.id.trim() !== ""
        );
        setCategories(validCategories);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={`bg-white font-archivo font-normal ${className}`}
      >
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent className="text-black font-archivo">
        {loading ? (
          <SelectItem value="loading">Loading...</SelectItem>
        ) : categories.length === 0 ? (
          <SelectItem value="no-categories">No categories</SelectItem>
        ) : (
          categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
