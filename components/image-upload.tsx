"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface ImageUploadProps {
  onFileSelect?: (file: File | null) => void;
  onUploadSuccess?: (url: string) => void;
  imgDefault?: string;
}

export default function ImageUpload({
  onFileSelect,
  onUploadSuccess,
  imgDefault,
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (onFileSelect) {
      onFileSelect(selectedFile); // kirim ke parent
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      const host = process.env.NEXT_PUBLIC_HOST_API;
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      const res = await axios.post(`${host}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Upload success");
      setUploading(false);
      const imageUrl = res.data.imageUrl;

      if (imageUrl && onUploadSuccess) {
        onUploadSuccess(imageUrl);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Upload error:",
          err.response?.status,
          err.response?.data
        );
      }

      console.error("Upload error:", err);
      toast.error("Upload error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="relative w-full h-full group">
            {file ? (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  className="rounded-lg w-full h-full object-cover"
                  alt={file.name || "Uploaded image"}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                  <span className="text-white text-xs font-medium">
                    Replace image
                  </span>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </>
            ) : imgDefault ? (
              <>
                <img
                  src={imgDefault}
                  className="rounded-lg w-full h-full object-cover"
                  alt="Default image"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                  <span className="text-white text-xs font-medium">
                    Replace image
                  </span>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-10 h-10 text-gray-400" />
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400 underline">
                    Click to select file
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Support File Type : jpg or png
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </label>
      </div>

      {file && (
        <div className="flex items-center justify-between mt-2 gap-[10px]">
          <div>
            <p className="font-medium text-xs">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <Button type="button" onClick={handleSubmit} disabled={uploading}>
            Upload
          </Button>
        </div>
      )}
    </>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
