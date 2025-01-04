import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormType = {
  defaultValue?: any;
  label: string;
  name: string;
  rows: number | undefined;
  placeholder?: string;
  error?: string;
};

const TextareaField = ({
  label,
  defaultValue,
  name,
  rows,
  placeholder,
  error,
}: FormType) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        defaultValue={defaultValue}
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder || label}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default TextareaField;
