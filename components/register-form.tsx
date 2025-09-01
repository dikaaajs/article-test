"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schemas/authSchema";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    const host = process.env.NEXT_PUBLIC_HOST_API;

    try {
      const res = await axios.post(`${host}/auth/register`, data);

      if (res.status === 200 || res.status === 201) {
        toast.success("Register berhasil! Silahkan login.");
        router.push("/auth/login");
      } else {
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.error || error.message}`);
      } else {
        toast.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
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
              <div className="grid gap-1">
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
              <div className="grid gap-1">
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

              {/* role */}
              <div className="grid gap-1">
                <Label htmlFor="role">Role</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full font-archivo">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="font-archivo">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-sm text-red-500 font-archivo">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* submit button */}
              <div className="flex flex-col gap-3">
                <Button type="submit" variant={"default"} className="w-full">
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm font-archivo">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 text-blue-600"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
