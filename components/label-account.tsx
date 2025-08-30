import React from "react";

export default function LabelAccount({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="py-[10px] px-[12px] border-[1px] border-slate-200 rounded-[6px] bg-gray-100 w-full flex justify-between">
      <div className="text-base font-semibold leading-[24px] font-archivo flex justify-between w-[40%] text-slate-900">
        <p>{label}</p>
        <p>:</p>
      </div>
      <p className="font-archivo text-base font-normal leading-[24px] w-[60%] text-center text-slate-900 overflow-auto px-[10px]">
        {value}
      </p>
    </div>
  );
}
