import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LabelAccount from "@/components/label-account";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      {/* container */}
      <div className="py-[40px] px-[20px] min-h-screen flex items-center justify-center w-full bg-white ">
        {/* card profile */}
        <div className="flex flex-col gap-[36px] py-[24px] px-[16px] w-full md:w-[400px]">
          <p className="font-archivo text-xl font-semibold text-slate-900 leading-[28px] text-center">
            User Profile
          </p>

          <div className="space-y-[24px] w-full">
            <Avatar className="h-[68px] w-[68px] mx-auto">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="space-y-[12px] w-full">
              {/* label */}
              <LabelAccount label="Username" value="Saswi" />
              <LabelAccount label="Password" value="AyamGorengRicaRica123" />
              <LabelAccount label="Role" value="Admin" />
            </div>
          </div>

          {/* button */}
          <a href="/dashboard/articles" className="w-full">
            <Button className="w-full">Back to dashboard</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
