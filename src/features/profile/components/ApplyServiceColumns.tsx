"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateServiceAction } from "@/features/event/servers/updateServiceAction";

type ApplyServiceData = {
  id: string;
  userId: string;
  eventId: string;
  status: string;
  participationType: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
  event: {
    title: string;
  };
};

export const ApplyServiceColumns: ColumnDef<ApplyServiceData>[] = [
  //Data Accessors
  {
    accessorKey: "user.name",
    //Sorting
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "event.title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [_data, action, _isPending] = useActionState(
        updateServiceAction,
        undefined,
      );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form action={action}>
              <input type="hidden" name="id" value={row.original.id} />
              <input type="hidden" name="userId" value={row.original.userId} />
              <input
                type="hidden"
                name="eventId"
                value={row.original.eventId}
              />
              <input
                type="hidden"
                name="status"
                value="approve" // Indicate the action type
              />
              <Button variant="ghost" type="submit">
                Approve
              </Button>
            </form>
            <form action={action}>
              <input type="hidden" name="id" value={row.original.id} />
              <input type="hidden" name="userId" value={row.original.userId} />
              <input
                type="hidden"
                name="eventId"
                value={row.original.eventId}
              />
              <input type="hidden" name="status" value="reject" />
              <Button variant="ghost" type="submit">
                Reject
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
