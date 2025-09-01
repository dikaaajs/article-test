"use client";

import { InputWithIcon } from "@/components/input-with-icon";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddCategoryButton from "@/components/add-category-button";
import DeleteButtonCategory from "@/components/delete-button-category";
import axios from "axios";
import EditButtonCategory from "@/components/edit-button-category";

interface Category {
  id: string;
  name: string;
  createdAt: String;
}

export default function page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCategories(search: string = "") {
    const host = process.env.NEXT_PUBLIC_HOST_API;
    try {
      const res = await axios.get(`${host}/categories`, {
        params: search ? { name: search } : {},
      });
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

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    <div>loading</div>;
  }

  return (
    <div className="min-h-screen pt-[24px] md:px-[24px] ">
      {/* container */}
      <div className="w-full border-[1px] overflow-hidden border-gray-200 rounded-sm md:rounded-[12px] bg-gray-50">
        {/* header */}
        <div className="w-full">
          {/* count */}
          <div className="p-[24px] border-b-[1px] border-slate-200">
            <p className="text-base font-archivo font-medium text-slate-800 ">
              Total Category : {categories.length}
            </p>
          </div>

          {/* search and add button */}
          <div className="p-[24px] border-b-[1px] border-slate-200 flex flex-col md:flex-row gap-[10px] justify-between">
            <InputWithIcon
              icon={<Search size={16} />}
              placeholder="Search Category"
              className="w-[240px]"
              onDebouncedChange={(val) => fetchCategories(val)}
            />

            <AddCategoryButton onCategoryAdded={fetchCategories} />
          </div>

          {/* table */}
          <Table className="font-archivo text-center text-slate-900">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Created at</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-slate-600 text-sm font-normal">
              {categories.map((cat) => {
                return (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.createdAt}</TableCell>
                    <TableCell className="flex justify-center items-center gap-[12px]">
                      <EditButtonCategory
                        id={cat.id}
                        name={cat.name}
                        onUpdated={fetchCategories}
                      />
                      <DeleteButtonCategory
                        onDeleted={fetchCategories}
                        id={cat.id}
                        name={cat.name}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* pagination */}
          <div className="py-[24px] px-[16px]">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
