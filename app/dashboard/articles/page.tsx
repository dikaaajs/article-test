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
import DeleteButtonArticles from "@/components/delete-button-articles";
import { ResponseDummyArticle } from "@/app/api/dummy/article/route";
import axios from "axios";
import SelectCategory from "@/components/select-category";

// data dummy
const articles = [
  {
    id: 1,
    thumbnail:
      "https://i.pinimg.com/736x/8f/fb/14/8ffb147352971e6ae4045e7139abe06f.jpg",
    title: "Cybersecurity Essentials Every Developer Should Know",
    category: "Technology, Gaming",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 2,
    thumbnail:
      "https://i.pinimg.com/1200x/94/d8/d6/94d8d6bb8a54b323afbd462852e9032f.jpg",
    title: "Mastering Next.js for Scalable Applications",
    category: "Web Development",
    createdAt: "April 14, 2025 09:22:45",
  },
  {
    id: 3,
    thumbnail:
      "https://i.pinimg.com/1200x/ff/e2/51/ffe25179ae2351ef9d6a55a20baa9b2a.jpg",
    title: "The Rise of AI in Everyday Applications",
    category: "AI, Technology",
    createdAt: "April 15, 2025 14:10:03",
  },
  {
    id: 4,
    thumbnail:
      "https://i.pinimg.com/1200x/55/5a/d1/555ad1d1183627ecf5cc4054a1d6bf90.jpg",
    title: "Top 10 Indie Games You Should Try in 2025",
    category: "Gaming",
    createdAt: "April 16, 2025 18:45:30",
  },
];

export default function page() {
  const [articles, setArticles] = useState<ResponseDummyArticle["data"]>([]);
  const [dataArticle, setDataArticle] = useState<{
    total: number;
    page: number;
    limit: number;
  }>({
    total: 0,
    page: 1,
    limit: 9,
  });
  const [loading, setLoading] = useState(true);

  const fetchArticles = async (category?: string, title?: string) => {
    const host = process.env.NEXT_PUBLIC_HOST_API;
    const params: Record<string, string | number> = {};

    if (category) params.category = category;
    if (title) params.title = title;

    try {
      const res = await axios.get(`${host}/articles`, { params });
      const json: ResponseDummyArticle = res.data;
      setArticles(json.data);
      setDataArticle({
        total: json.total,
        page: json.page,
        limit: json.limit,
      });
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="min-h-screen pt-[24px] md:px-[24px] w-full">
      {/* container */}
      <div className="w-full border-[1px] overflow-hidden border-gray-200 rounded-sm md:rounded-[12px] bg-gray-50">
        <div className="w-full">
          {/* count */}
          <div className="p-[24px] border-b-[1px] border-slate-200">
            <p className="text-base font-archivo font-medium text-slate-800">
              Total Articles : {articles.length}
            </p>
          </div>

          {/* search and add button */}
          <div className="p-[24px] border-b-[1px] border-slate-200 flex flex-col md:flex-row gap-[10px] justify-between">
            <div className="flex gap-[10px] items-center">
              <SelectCategory
                className="w-full md:w-[180px] md:h-[40px]"
                onChange={(value) => {
                  fetchArticles(value);
                }}
              />
              <InputWithIcon
                icon={<Search size={16} />}
                placeholder="Search By Title"
                className="w-[240px]"
              />
            </div>

            <a href="articles/upload">
              <Button>
                <Plus />
                Add Articles
              </Button>
            </a>
          </div>

          {/* table */}
          <Table className="font-archivo text-center text-slate-900">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-center px-[20px]">
                  Thumbnails
                </TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Created at</TableHead>
                <TableHead className="text-center px-[20px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-slate-600 text-sm font-normal">
              {articles.map((article: any) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <img
                      src={article.thumbnail}
                      alt="thumbnail"
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] object-cover rounded-[6px] mx-auto"
                    />
                  </TableCell>
                  <TableCell className="text-left">{article.title}</TableCell>
                  <TableCell>{article.category.name}</TableCell>
                  <TableCell>{article.createdAt}</TableCell>

                  <TableCell className="flex justify-center items-center gap-[12px]">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-600 underline p-0 h-fit my-auto"
                    >
                      Preview
                    </Button>
                    <a href={`/dashboard/articles/${article.id}/edit`}>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 underline p-0 h-fit my-auto"
                      >
                        Edit
                      </Button>
                    </a>

                    {/* delete button */}
                    <DeleteButtonArticles id={article.id} />
                  </TableCell>
                </TableRow>
              ))}
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
