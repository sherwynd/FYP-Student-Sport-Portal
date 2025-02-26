"use client";

import React from "react";
import { registerEvent } from "../../../features/event/servers/registerEventAction";
import { useActionState } from "react";

const RegisterServiceButton = ({
  userId,
  eventId,
  numberOfPeople,
}: {
  userId: string;
  eventId: string;
  numberOfPeople: number;
}) => {
  const [data, action, _isPending] = useActionState(registerEvent, undefined);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-4 px-4 py-6">
      <form action={action}>
        <input type="hidden" name="userId" value={userId}></input>
        <input type="hidden" name="eventId" value={eventId}></input>
        <input type="hidden" name="participationType" value="particapant" />
        <button className="rounded bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600">
          Register Event
        </button>
      </form>
      {numberOfPeople && numberOfPeople > 0 ? (
        <form action={action}>
          <input type="hidden" name="userId" value={userId}></input>
          <input type="hidden" name="eventId" value={eventId}></input>
          <input type="hidden" name="participationType" value="helper" />
          <button className="rounded bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600">
            Apply Service
          </button>
        </form>
      ) : (
        ""
      )}
      {data?.error && <span className="text-red-600">{data?.error}</span>}
      {data?.message && <span className="text-green-600">{data?.message}</span>}
    </div>
  );
};

export default RegisterServiceButton;
