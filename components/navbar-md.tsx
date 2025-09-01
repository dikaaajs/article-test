"use client";

import React, { useEffect, useState } from "react";
import ProfileMenu from "./profile-menu";
import { Button } from "./ui/button";
import Link from "next/link";

export default function NavbarMD() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // ambil dari localStorage setelah komponen mount (client-side)
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setUsername(user.username || "");
    }
  }, []);

  return (
    <nav className="hidden md:flex justify-between py-[32px] px-[60px] absolute w-full z-10 top-0 left-0">
      {/* logo */}
      <img src="/logo/logo-putih.svg" alt="Logo" width={134} height={24} />

      {/* user profile */}
      {username === "" ? (
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      ) : (
        <ProfileMenu
          avatarUrl="https://github.com/shadcn.png"
          name={username}
        />
      )}
    </nav>
  );
}
