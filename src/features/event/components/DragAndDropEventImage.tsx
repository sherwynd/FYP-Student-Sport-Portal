"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function DragAndDropEventImage({
  setImageFile,
}: {
  setImageFile: (file: File | null) => void;
}) {
  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      console.log("Invalid file or no file dropped");
    }
  };

  const handleDelete = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="relative flex h-60 w-full max-w-md items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white"
      >
        {previewUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={previewUrl}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
            <button
              onClick={handleDelete}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-sm text-white"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-gray-500">
            Drag and drop an image here, or click to upload.
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute h-full w-full opacity-0"
            />
          </label>
        )}
      </div>
    </div>
  );
}
