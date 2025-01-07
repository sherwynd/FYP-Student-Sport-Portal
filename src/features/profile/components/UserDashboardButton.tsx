"use client";
import React, { useActionState } from "react";
import { createUserDashboard } from "../servers/createUserDashboardAction";
import { Button } from "@/components/ui/button";

type TId = {
  id: string;
};
export default function UserDashboardButton({ id }: TId) {
  const [data, action, isPending] = useActionState(
    createUserDashboard,
    undefined,
  );

  return (
    <form action={action}>
      <input name="userDashboardFile" type="file" accept=".csv" />
      <input name="id" type="hidden" value={id} />
      <Button type="submit" disabled={isPending}>
        Upload File
      </Button>
      <span style={{ color: "red" }}>{data?.fileError}</span>
      <span style={{ color: "green" }}>{data?.success}</span>
    </form>
  );
}
