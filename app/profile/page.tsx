"use client";

import NavbarSM from "@/components/navbar-sm";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LabelAccount from "@/components/label-account";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Profile = {
  id: string;
  username: string;
  role: string;
};

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_HOST_API;

    const fetchProfile = async () => {
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

        if (res.status === 200) {
          setProfile(res.data);
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

    fetchProfile();
  }, [router]);

  return (
    <div>
      <NavbarSM />

      {/* container */}
      <div className="py-[40px] px-[20px] min-h-screen flex items-center justify-center w-full">
        {/* card profile */}
        <div className="flex flex-col gap-[36px] py-[24px] px-[16px] w-full md:w-[400px]">
          <p className="font-archivo text-xl font-semibold text-slate-900 leading-[28px] text-center">
            User Profile
          </p>

          {profile ? (
            <div className="space-y-[24px] w-full">
              <Avatar className="h-[68px] w-[68px] mx-auto">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-[12px] w-full">
                <LabelAccount label="Username" value={profile.username} />
                <LabelAccount label="Role" value={profile.role} />
                <LabelAccount label="ID" value={profile.id} />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}

          {/* button */}
          <a href="/" className="w-full">
            <Button className="w-full">Back to home</Button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
