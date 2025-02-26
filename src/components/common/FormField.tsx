import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormType = {
  defaultValue?: any;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
};

const FormField = ({
  label,
  defaultValue,
  type,
  name,
  placeholder,
  error,
}: FormType) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default FormField;
