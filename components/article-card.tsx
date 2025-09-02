import React from "react";
import { Badge } from "./ui/badge";
import { ResponseDummyArticle } from "@/app/api/dummy/article/route";

export default function ArticleCard({
  article,
}: {
  article: ResponseDummyArticle["data"][0];
}) {
  return (
    <div key={article.id} className="w-full flex flex-col gap-[16px]">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="rounded-[12px] object-cover h-[200px] md:h-[240px] w-full items-center bg-slate-100 text-center font-archivo font-semibold text-muted-foreground"
      />
      <div className="flex flex-col gap-[8px] font-archivo">
        <p className="text-xs md:text-sm text-slate-600">
          {new Date(article.createdAt).toDateString()}
        </p>
        <a
          href={`/article/${article.id}`}
          className="font-semibold text-[16px] md:text-lg text-slate-900"
        >
          {article.title}
        </a>
        <p className="text-sm md:text-base text-slate-600">{article.content}</p>
        <div className="flex gap-[8px]">
          <Badge
            variant="secondary"
            className="text-blue-900 text-xs md:text-sm bg-blue-200 rounded-[100px] py-[4px] px-[12px]"
          >
            {article.category.name}
          </Badge>
        </div>
      </div>
    </div>
  );
}
