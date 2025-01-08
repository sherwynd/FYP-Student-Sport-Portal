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
  accept?: string;
  helper?: string;
};

const UploadField = ({
  label,
  defaultValue,
  type,
  name,
  placeholder,
  error,
  accept,
  helper,
}: FormType) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
        accept={accept}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        {helper}
      </p>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default UploadField;
