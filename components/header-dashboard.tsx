"use client";

import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import ProfileMenu from "./profile-menu";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function HeaderDashboard() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const mainSegment = segments[1] || "articles";

  return (
    <header className="border-b-[1px] border-gray-50 ">
      <div className="flex justify-between w-full px-[24px]">
        {/* left */}
        <div className="flex h-16 shrink-0 items-center gap-2">
          <SidebarTrigger className="-ml-1" />

          {mainSegment ? (
            <p className="font-archivo text-xl font-semibold text-slate-900">
              {mainSegment.charAt(0).toUpperCase() + mainSegment.slice(1)}
            </p>
          ) : (
            <Skeleton className="h-6 w-32 rounded" />
          )}
        </div>

        {/* right */}
        <ProfileMenu
          avatarUrl="https://github.com/shadcn.png"
          name="saswi"
          isAdmin={true}
        />
      </div>
    </header>
  );
}
