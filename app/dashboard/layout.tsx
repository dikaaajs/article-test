"use client";

import React, { ReactNode, useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import HeaderDashboard from "@/components/header-dashboard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const host = process.env.NEXT_PUBLIC_HOST_API;

      try {
        const token = localStorage.getItem("token"); // ambil token dari localStorage
        if (token === null) {
          router.push("/auth/login");
          toast.error("Anda harus login terlebih dahulu.");
          return;
        }
        const res = await axios.get(`${host}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // kirim token
          },
        });

        console.log(res.data);

        if (res.status === 200) {
          // setProfile(res.data);
          if (res.data.role !== "Admin") {
            toast.error("Anda tidak memiliki akses ke dashboard.");
            router.push("/");
          }
        }
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error("Sesi habis, silakan login kembali.");
          router.push("/auth/login");
        } else {
          toast.error("Gagal mengambil profile.");
          console.error(error);
        }
      }
    };
    checkRole();
  }, [router]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderDashboard />
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-100">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
