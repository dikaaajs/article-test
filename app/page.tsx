"use client";

import { useEffect, useState } from "react";
import NavbarMD from "@/components/navbar-md";
import NavbarSM from "@/components/navbar-sm";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ResponseDummyArticle } from "./api/dummy/article/route";
import axios from "axios";
import ArticleCard from "@/components/article-card";
import LoadingArticleCard from "@/components/loading-article-card";
import Footer from "@/components/footer";
import SelectCategory from "@/components/select-category";

export default function Home() {
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

  return (
    <main>
      {/* navbar mobile */}
      <div className="md:hidden">
        <NavbarSM />
      </div>

      {/* hero */}
      <div className="h-[560px] md:h-[500px] relative bg-[url(/banner.jpg)] opacity-[86] bg-cover bg-center flex items-center justify-center">
        <div className="bg-[#2563EBDB] absolute w-full h-full opacity-[86]"></div>
        <NavbarMD />

        {/* container */}
        <div className="w-[90%] md:w-[730px] flex flex-col gap-[40px]">
          <div className="text-white z-10 text-center font-archivo flex flex-col gap-[12px]">
            <p className="font-bold text-base">Blog genzet</p>
            <p className="text-4xl md:text-5xl font-medium">
              The Journal : Design Resources, Interviews, and Industry News
            </p>
            <p className="text-xl md:text-2xl">
              Your daily dose of design insights!
            </p>
          </div>

          {/* filter */}
          <div className="bg-blue-500 w-full md:w-fit rounded-[12px] p-[10px] flex flex-col md:flex-row gap-[8px] z-10 mx-auto">
            {/* select category */}
            <SelectCategory
              className="w-full md:w-[180px] md:h-[40px]"
              onChange={(value) => {
                fetchArticles(value);
              }}
            />

            <div className="relative w-full md:w-[400px] ">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <Input
                placeholder="Search articles"
                className="pl-8 bg-white font-archivo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="pt-[40px] pb-[60px] md:pb-[100px] px-[20px] md:px-[100px] flex flex-col gap-[24px]">
        <p className="font-archivo text-base text-medium text-slate-600 leading-[24px]">
          Showing : {articles.length} articles of {dataArticle.total}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] md:gap-y-[60px] md:gap-x-[40px]">
          {/* loading condition */}
          {loading ? (
            <LoadingArticleCard />
          ) : (
            articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))
          )}
        </div>

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

      {/* footer */}
      <Footer />
    </main>
  );
}
