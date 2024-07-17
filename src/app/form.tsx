"use client";
// import { addEvents } from "@/actions/event";

export default function Form() {
  return (
    <>
      <p>Client component</p>
      <form>
        <label>Form</label>
        <input
          type="text"
          name="item"
          className="m-1"
          placeholder="Write the item..."
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
