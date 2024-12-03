"use client";
import { useState } from "react";

import { addEvent, editEvent } from "@/actions/eventAction";
import Image from "next/image";

type EventFormProps = {
  actionType: "Create" | "Edit";
  initialData?: {
    id: string;
    title: string;
    description: string;
    courseLevel: string;
    creditHour: number;
  };
};

const EventForm = ({ actionType, initialData }: EventFormProps) => {
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
        <h2 className="mb-4 text-center text-2xl font-semibold">
          {actionType} Event Form
        </h2>
        <form
          className="space-y-2"
          action={
            actionType === "Create"
              ? (formData) => addEvent(formData, imageFile)
              : (formData) =>
                  editEvent(formData, imageFile, initialData?.id ?? "")
          }
        >
          {/* Drag and Drop Section */}
          <div
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            className="relative flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          >
            {previewUrl ? (
              <div className="relative h-full w-full">
                <Image
                  src={previewUrl}
                  width={10}
                  height={10}
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
                  name="eventImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute h-full w-full opacity-0"
                />
              </label>
            )}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() =>
                document.getElementById("fileUploadInput")?.click()
              }
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Upload File
            </button>
            <input
              type="file"
              id="fileUploadInput"
              name="eventImage"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
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
              defaultValue={initialData?.title ?? ""}
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
              required
              defaultValue={initialData?.description ?? ""}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              defaultValue={initialData?.courseLevel ?? ""}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Event Credit Hours */}
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="creditHour"
            >
              Event Credit Hours
            </label>
            <input
              type="number"
              name="creditHour"
              placeholder="Write the credit hours..."
              required
              defaultValue={initialData?.creditHour ?? ""}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              type="file"
              name="certificate"
              placeholder="Insert the certificate file(s)"
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple
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
};

export default EventForm;
