"use client";
import React, { useState } from "react";
import Image from "next/image";

interface DragAndDropImageProps {
  name: string; // Name for the file input to identify the data in the backend
}

const DragAndDropImage: React.FC<DragAndDropImageProps> = ({ name }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    } else {
      handleDelete();
    }
  };

  const setFile = (file: File) => {
    setPreviewUrl(URL.createObjectURL(file));
    // Keep the file input in the DOM to ensure FormData works
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    const input = document.querySelector(
      `input[name="${name}"]`,
    ) as HTMLInputElement;
    if (input) {
      input.value = ""; // Clear the file input
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      className="relative flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
    >
      {previewUrl ? (
        <div className="relative h-full w-full">
          <Image
            src={previewUrl}
            layout="fill"
            alt="Preview"
            className="rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleDelete}
            className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-2 text-white"
          >
            ✕
          </button>
        </div>
      ) : (
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-500">
          Drag and drop an image here, or click to upload.
        </label>
      )}
      {/* Keep the file input hidden but in the DOM */}
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="absolute z-0 h-full w-full opacity-0"
      />
    </div>
  );
};

export default DragAndDropImage;
