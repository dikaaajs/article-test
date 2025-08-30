import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function LoadingArticleCard() {
  return Array.from({ length: 6 }).map((_, idx) => (
    <div key={idx} className="flex flex-col gap-[16px]">
      <Skeleton className="h-[200px] md:h-[240px] w-full rounded-[12px]" />
      <div className="flex flex-col gap-[8px]">
        <Skeleton className="h-[16px] w-[100px]" />
        <Skeleton className="h-[24px] w-[80%]" />
        <Skeleton className="h-[20px] w-[90%]" />
        <Skeleton className="h-[20px] w-[60%]" />
      </div>
    </div>
  ));
}
