import Article from "@/components/article";
import NavbarSM from "@/components/navbar-sm";
import React from "react";

const articleContent = `
In the ever-evolving world of digital product design, collaboration between designers and developers has always been a crucial—yet often challenging—part of the process. In April 2025, Figma introduced Dev Mode, a powerful new feature aimed at streamlining that collaboration more than ever before.

**🔧 What Is Dev Mode?**


Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as spacing, color values, font styles, and asset exports—without disrupting the design file or asking the design team for clarifications.

Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as spacing, color values, font styles, and asset exports—without disrupting the design file or asking the design team for clarifications.
`;

export default function page() {
  return (
    <div>
      <NavbarSM />

      {/* container article */}
      <div className="py-[40px] px-[20px] md:px-[160px] font-archivo">
        <div className="w-full space-y-[24px] md:space-y-[40px]">
          {/* header article */}
          <div className="space-y-[16px] text-center">
            <div className="flex gap-[4px] text-slate-600 text-sm font-medium leading-[20px] justify-center">
              <p>February 4, 2025</p>
              <p>•</p>
              <p>Created by Admin</p>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold leading-[32px] md:leading-[36px] text-slate-900">
              Figma's New Dev Mode: A Game-Changer for Designers & Developers
            </h1>
          </div>

          {/* image */}
          <img
            src="https://i.pinimg.com/736x/61/99/16/619916e8690c7487680f3183dbe19e63.jpg"
            className="w-full h-[240px] md:h-[480px] rounded-[12px] object-cover"
            alt=""
          />

          <Article content={articleContent} />
        </div>
      </div>

      {/* container other article */}
      <div className="pt-[40px] px-[20px] md:px-[180px] md:pb-[100px] pb-[60px] space-y-[24px] md:space-y-[60px]"></div>
    </div>
  );
}
