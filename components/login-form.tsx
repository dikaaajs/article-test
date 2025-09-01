"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const host = process.env.NEXT_PUBLIC_HOST_API;

    try {
      // Kirim request ke API login
      const res = await axios.post(`${host}/auth/login`, data);

      if (res.status === 401) {
        toast.error("Username atau password salah.");
        return;
      }

      if (res.status === 200) {
        // Simpan token ke localStorage
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }

        const profileRes = await axios.get(`${host}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });
        console.log(profileRes);
        if (profileRes.status === 200 && profileRes.data) {
          localStorage.setItem("user", JSON.stringify(profileRes.data));
        }

        toast.success("Login berhasil! Selamat datang 🎉");
        router.push("/");
      } else {
        toast.error(res.data?.message || "Login gagal, coba lagi.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message);
      } else {
        toast.error("Terjadi kesalahan, coba lagi.");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader className="flex flex-col items-center">
          <Image src="/logo/logo.svg" alt="Logo" width={134} height={24} />
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6">
              {/* username */}
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Input username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 font-archivo">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Input password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-archivo">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" variant={"default"} className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm font-archivo">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="underline underline-offset-4 text-blue-600"
              >
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
