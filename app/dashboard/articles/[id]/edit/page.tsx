"use client";

import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/image-upload";
import SelectCategory from "@/components/select-category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { ArrowLeft, Bold, Image, Italic, Redo2, Undo2 } from "lucide-react";
import { articleSchema, ArticleSchema } from "@/schemas/articlesSchema";
import axios from "axios";
import { ArticleType } from "@/app/article/[...id]/page";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PreviewArticle, { PreviewPageType } from "@/components/preview-article";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // unwrap pakai React.use()
  const [previewData, setPreviewData] = React.useState<PreviewPageType | null>(
    null
  );
  const {
    register,
    handleSubmit,
    setValue,
    reset, // tambahin ini
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      thumbnails: undefined,
    },
  });

  // fungsi wrap selection dengan markdown
  const wrapSelection = (symbol: string) => {
    const textarea = document.getElementById(
      "content-textarea"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    // bungkus teks dengan simbol (* atau **)
    const newText = before + symbol + selectedText + symbol + after;
    textarea.value = newText;

    // update react-hook-form
    setValue("content", newText, { shouldValidate: true });

    // balikin focus ke textarea
    textarea.focus();
    textarea.setSelectionRange(start + symbol.length, end + symbol.length);
  };

  const content = watch("content");
  const router = useRouter();

  async function getArticle(id: string): Promise<ArticleType> {
    const host = process.env.NEXT_PUBLIC_HOST_API;
    try {
      const res = await axios.get(`${host}/articles/${id}`);
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch article");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const article = await getArticle(id);

      // isi nilai form dengan data dari API
      reset({
        title: article.title,
        category: article.categoryId, // pastikan sesuai key dari API
        content: article.content,
        thumbnails: article.imageUrl,
      });
    }

    fetchData();
  }, [id, reset]);

  const onSubmit = async (values: ArticleSchema) => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST_API;
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${host}/articles/${id}`,
        {
          title: values.title,
          categoryId: values.category,
          content: values.content,
          imageUrl: values.thumbnails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", res.data);
      toast.success("berhasil mengupdate");
      router.push("/dashboard/articles");
    } catch (err) {
      console.error("Error:", err);
      toast.error("gagal mengupdate article");
    }
  };

  return (
    <>
      <div className="w-full border border-gray-200 rounded-sm md:rounded-[12px] bg-gray-50">
        {/* Back */}
        <div className="p-[20px] flex">
          <a href="/dashboard/articles">
            <ArrowLeft />
          </a>
          <span className="ml-[10px] text-base font-archivo font-medium text-slate-800">
            Edit Articles
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[24px] space-y-[24px]"
        >
          {/* thumbnails, title, category */}
          <div className="space-y-[16px]">
            {/* Thumbnails */}
            <div className="grid gap-1">
              <Label>Thumbnails</Label>
              <div className="w-[200px]">
                <ImageUpload
                  onUploadSuccess={(url: string) => {
                    setValue("thumbnails", url);
                  }}
                  imgDefault={watch("thumbnails")}
                />
              </div>
              {typeof errors.thumbnails?.message === "string" && (
                <p className="text-red-500 text-xs">
                  {errors.thumbnails.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="grid gap-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Input title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="grid gap-1">
              <Label htmlFor="category">Category</Label>
              <SelectCategory
                className="w-full"
                value={watch("category")} // supaya muncul nilai awal
                onChange={(val: string) => setValue("category", val)}
              />
              <CardDescription>
                The existing category list can be seen in the{" "}
                <a
                  href="/dashboard/category"
                  className="text-blue-600 underline"
                >
                  category
                </a>{" "}
                menu
              </CardDescription>
              {errors.category && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="rounded-[12px] border overflow-hidden border-gray-200 shadow-sm">
            {/* Header */}
            <div className="p-[16px] bg-white border-b border-slate-200">
              <div className="flex gap-3 text-slate-600">
                <div className="flex gap-1">
                  <button type="button">
                    <Undo2 width={16} />
                  </button>
                  <button type="button">
                    <Redo2 width={16} />
                  </button>
                </div>

                <div className="flex gap-1">
                  <button type="button" onClick={() => wrapSelection("**")}>
                    <Bold width={16} />
                  </button>
                  <button type="button" onClick={() => wrapSelection("*")}>
                    <Italic width={16} />
                  </button>
                </div>

                <div className="flex border-x border-slate-200 px-3 gap-1">
                  <button type="button">
                    <Image width={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div className="min-h-[300px] p-[16px] font-archivo text-sm">
              <textarea
                id="content-textarea"
                placeholder="Type a content..."
                className="w-full h-full min-h-[300px] border-0 outline-none resize-none"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 text-xs">{errors.content.message}</p>
              )}
            </div>

            {/* Word count */}
            <div className="bg-white border-t border-slate-200 px-[16px] py-[12px]">
              <p className="text-xs font-normal font-archivo text-slate-900">
                {content.split(/\s+/).filter(Boolean).length} Words
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="py-[16px] flex justify-end gap-[10px]">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                setPreviewData({
                  title: watch("title"),
                  imageUrl: watch("thumbnails") ?? "",
                  content: watch("content"),
                });
              }}
            >
              Preview
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>
      {previewData && (
        <>
          <p className="font-archivo font-2xl font-bold text-slate-900">
            Preview
          </p>
          <div className="pt-10 rounded-xl overflow-hidden border">
            <PreviewArticle
              title={previewData.title}
              imageUrl={previewData.imageUrl}
              content={previewData.content}
            />
          </div>
        </>
      )}
    </>
  );
}
