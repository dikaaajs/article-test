"use client";

import { InputWithIcon } from "@/components/input-with-icon";
import { Search } from "lucide-react";
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
  createdAt: Date;
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  async function fetchCategories(search: string = "", page: number = 1) {
    const host = process.env.NEXT_PUBLIC_HOST_API;
    try {
      setLoading(true);
      const res = await axios.get(`${host}/categories`, {
        params: {
          search: search || undefined,
          page,
        },
      });

      const validCategories = (res.data.data || []).filter(
        (cat: Category) => cat.id && cat.id.trim() !== ""
      );

      setCategories(validCategories);
      setPageInfo({
        totalData: res.data.totalData,
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-[24px] md:px-[24px]">
      {/* container */}
      <div className="w-full border-[1px] overflow-hidden border-gray-200 rounded-sm md:rounded-[12px] bg-gray-50">
        {/* header */}
        <div className="w-full">
          {/* count */}
          <div className="p-[24px] border-b-[1px] border-slate-200">
            <p className="text-base font-archivo font-medium text-slate-800">
              Total Category : {pageInfo.totalData}
            </p>
          </div>

          {/* search and add button */}
          <div className="p-[24px] border-b-[1px] border-slate-200 flex flex-col md:flex-row gap-[10px] justify-between">
            <InputWithIcon
              icon={<Search size={16} />}
              placeholder="Search Category"
              className="w-[240px]"
              onDebouncedChange={(val) => fetchCategories(val, 1)}
            />

            <AddCategoryButton onCategoryAdded={() => fetchCategories("", 1)} />
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
                    <TableCell>
                      {new Date(cat.createdAt).toDateString()}
                    </TableCell>
                    <TableCell className="flex justify-center items-center gap-[12px]">
                      <EditButtonCategory
                        id={cat.id}
                        name={cat.name}
                        onUpdated={() =>
                          fetchCategories("", pageInfo.currentPage)
                        }
                      />
                      <DeleteButtonCategory
                        onDeleted={() =>
                          fetchCategories("", pageInfo.currentPage)
                        }
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
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pageInfo.currentPage > 1) {
                        fetchCategories("", pageInfo.currentPage - 1);
                      }
                    }}
                  />
                </PaginationItem>

                {/* Numbered pages */}
                {[...Array(pageInfo.totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={pageInfo.currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        fetchCategories("", i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pageInfo.currentPage < pageInfo.totalPages) {
                        fetchCategories("", pageInfo.currentPage + 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
