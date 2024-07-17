"use client";
import { addEvents } from "@/actions/event";

export default function Form() {
  return (
    <>
      <p>Client component</p>
      <form action={addEvents}>
        <label>Form</label>
        <input
          type="text"
          name="title"
          className="m-1"
          placeholder="Write the title..."
          required
        />
        <input
          type="text"
          name="body"
          className="m-1"
          placeholder="Write the body..."
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
