import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "../ui/label";

type Option = {
  value: string;
  label: string;
};

type FormType = {
  defaultValue?: any;
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  error?: string;
};

export function SelectField({
  label,
  name,
  options,
  placeholder,
  error,
}: FormType) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder || label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
