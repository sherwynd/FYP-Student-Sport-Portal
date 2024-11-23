"use client";
import { addEvents } from "@/actions/event";

export default function EventForm() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 rounded-md bg-white p-6 shadow-lg">
        <h1 className="block text-center text-3xl font-semibold">Event Form</h1>
        <form action={addEvents}>
          <div className="mt-3">
            <label className="mb-2 block text-base">Event Title</label>
            <input
              type="text"
              name="title"
              className="w-full border px-2 py-1 text-base focus:border-gray-600 focus:outline-none focus:ring-0"
              placeholder="Write the title..."
              required
            />
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-base">Event Description</label>
            <input
              type="text"
              name="description"
              className="w-full border px-2 py-1 text-base focus:border-gray-600 focus:outline-none focus:ring-0"
              placeholder="Write the description..."
              required
            />
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-base">Event Course Level</label>
            <input
              type="text"
              name="courseLevel"
              className="w-full border px-2 py-1 text-base focus:border-gray-600 focus:outline-none focus:ring-0"
              placeholder="Write the Course Level..."
              required
            />
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-base">Event Credit Hours</label>
            <input
              type="text"
              name="creditHour"
              className="w-full border px-2 py-1 text-base focus:border-gray-600 focus:outline-none focus:ring-0"
              placeholder="Write the Credit Hours..."
              required
            />
          </div>
          <div className="mt-3">
            <label className="mb-2 block text-base">Event Certificate</label>
            <input
              type="text"
              name="certificate"
              className="w-full border px-2 py-1 text-base focus:border-gray-600 focus:outline-none focus:ring-0"
              placeholder="Write the Certificate..."
              required
            />
          </div>

          <div className="mt-3 flex justify-center rounded-md bg-green-500">
            <button className="text-neutral-50" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
