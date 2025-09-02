import React from "react";
import Article from "@/components/article";
import ArticleCard from "@/components/article-card";
import Footer from "@/components/footer";
import NavbarSM from "@/components/navbar-sm";
import axios from "axios";

export interface PreviewPageType {
  title: string;
  imageUrl: string;
  content: string;
}

export default function PreviewArticle({
  title,
  imageUrl,
  content,
}: PreviewPageType) {
  return (
    <div>
      <NavbarSM />

      {/* container article */}
      <div className="py-[40px] px-[20px] md:px-[160px] font-archivo">
        <div className="w-full space-y-[24px] md:space-y-[40px]">
          {/* header */}
          <div className="space-y-[16px] text-center">
            <div className="flex gap-[4px] text-slate-600 text-sm font-medium leading-[20px] justify-center">
              <p>{new Date(new Date()).toLocaleDateString()}</p>
              <p>•</p>
              <p>Created by admin</p>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold leading-[32px] md:leading-[36px] text-slate-900">
              {title}
            </h1>
          </div>

          {/* image */}
          {imageUrl && (
            <img
              src={imageUrl}
              className="w-full h-[240px] md:h-[480px] rounded-[12px] object-cover"
              alt={title}
            />
          )}

          <Article content={content} />
        </div>
      </div>

      {/* related articles */}
      {/* <div className="pt-[40px] px-[20px] md:px-[180px] md:pb-[100px] pb-[60px] space-y-[24px] md:space-y-[60px]">
          <p className="font-archivo text-lg font-bold leading-[28px] md:text-xl text-slate-900">
            Related Articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[40px]">
            {related.length > 0 ? (
              related.map((a) => <ArticleCard article={a} key={a.id} />)
            ) : (
              <p className="text-slate-500">No related articles found</p>
            )}
          </div>
        </div> */}

      <Footer />
    </div>
  );
}
