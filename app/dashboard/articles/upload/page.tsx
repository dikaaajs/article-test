import ImageUpload from "@/components/image-upload";
import SelectCategory from "@/components/select-category";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bold, Image, Italic, Redo2, Undo2 } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="w-full border-[1px] overflow-hidden border-gray-200 rounded-sm md:rounded-[12px] bg-gray-50">
      {/* back navigation */}
      <div className="p-[20px] flex">
        <a href="/dashboard/articles">
          <ArrowLeft />
        </a>
        <span className="ml-[10px] text-base font-archivo font-medium text-slate-800">
          Create Articles
        </span>
      </div>

      {/* form */}
      <form action="" className="p-[24px] space-y-[24px]">
        {/* thumbails, title, category */}
        <div className="space-y-[16px]">
          {/* thumbnails */}
          <div className="grid gap-1">
            <Label htmlFor="thumbnails">Thumbnails</Label>
            <div className="w-[200px]">
              <ImageUpload />
            </div>
          </div>

          {/* title */}
          <div className="grid gap-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" placeholder="Input title" />
          </div>

          {/* category */}
          <div className="grid gap-1">
            <Label htmlFor="category">Category</Label>
            <SelectCategory className="w-full" />
            <CardDescription>
              The existing category list can be seen in the{" "}
              <a href="/dashboard/category" className="text-blue-600 underline">
                category
              </a>{" "}
              menu
            </CardDescription>
          </div>
        </div>

        {/* canvas */}
        <div className="rounded-[12px] border-[1px] overflow-hidden border-gray-200 shadow-sm">
          {/* header canvas */}
          <div className="p-[16px] bg-white border-b-[1px] border-slate-200">
            {/* tools canvas */}
            <div className="flex gap-3 text-slate-600">
              {/* undo redo */}
              <div className="flex gap-1">
                <button>
                  <Undo2 width={16} />
                </button>
                <button>
                  <Redo2 width={16} />
                </button>
              </div>

              {/* bold italix */}
              <div className="flex gap-1">
                <button>
                  <Bold width={16} />
                </button>
                <button>
                  <Italic width={16} />
                </button>
              </div>

              {/* image */}
              <div className="flex border-x-[1px] border-slate-200 px-3 gap-1">
                <button>
                  <Image width={16} />
                </button>
              </div>
            </div>
          </div>

          {/* canvas */}
          <div className="min-h-[300px] p-[16px] font-archivo text-sm">
            <textarea
              name="article"
              id="article"
              placeholder="Type a content..."
              className="w-full h-full min-h-[300px] border-0 outline-none resize-none"
            ></textarea>
          </div>

          {/* total word */}
          <div className="bg-white border-b-[1px] border-slate-200 px-[16px] py-[24px]">
            <p className="text-xs font-normal font-archivo text-slate-900">
              0 Words
            </p>
          </div>
        </div>

        {/* buttons */}
        <div className="py-[16px] flex justify-end gap-[10px]">
          <Button variant={"ghost"}>Cencel</Button>
          <Button variant={"secondary"}>Preview</Button>
          <Button>Upload</Button>
        </div>
      </form>
    </div>
  );
}
