"use client";
import { useState } from "react";

import { addEvent } from "@/actions/eventAction";

export default function EventForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    console.log("Image removed");
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-semibold">Event Form</h2>
        <form
          className="space-y-2"
          action={(formData) => addEvent(formData, imageFile)}
        >
          {/* Drag and Drop Section */}
          <div
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            className="relative flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          >
            {previewUrl ? (
              <div className="relative h-full w-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
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

          {/* Event Title */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Event Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Write the title..."
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Event Description */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Event Description
            </label>
            <textarea
              name="description"
              placeholder="Write the description..."
              rows={3}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Event Course Level */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="courseLevel"
            >
              Event Course Level
            </label>
            <input
              type="text"
              name="courseLevel"
              placeholder="Write the course level..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Event Credit Hours */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="creditHours"
            >
              Event Credit Hours
            </label>
            <input
              type="number"
              name="creditHours"
              placeholder="Write the credit hours..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Event Certificate */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="certificate"
            >
              Event Certificate
            </label>
            <input
              type="text"
              name="certificate"
              placeholder="Write the certificate..."
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
