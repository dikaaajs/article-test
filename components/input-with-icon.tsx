"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  containerClassName?: string;
  onDebouncedChange?: (value: string) => void; // callback debounce
  debounceDelay?: number; // biar bisa custom (default 400ms)
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  containerClassName = "",
  className = "",
  onDebouncedChange,
  debounceDelay = 400,
  ...props
}) => {
  const [value, setValue] = useState(props.value?.toString() || "");
  const prevValue = useRef(value); // simpan value sebelumnya

  // efek untuk debounce
  useEffect(() => {
    if (!onDebouncedChange) return;

    const handler = setTimeout(() => {
      // cek apakah ada perubahan
      if (value !== prevValue.current) {
        onDebouncedChange(value);
        prevValue.current = value; // update prev
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceDelay, onDebouncedChange]);

  return (
    <div className={`relative w-full ${containerClassName}`}>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
        {icon}
      </div>
      <Input
        className={`pl-8 bg-white font-archivo ${className}`}
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
