"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertReportSubmitForm } from "./AlertReportSubmitForm";

// import { AlertReportDelete } from "../ui/AlertReportDelete";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type UserReportSubmissionData = {
  id: string;
  userId: string;
  eventId: string;
  status: string;
  SubmittedAt?: Date | null;
  eventRegistrationId: string;
  createdAt: Date;
  updatedAt: Date;
  eventRegistration: {
    event: {
      title: string;
    };
  };
  reportFile?: {
    id: String;
    filename: String;
    contentType: String;
    data: Buffer;
  };
};

export const UserReportSubmissionColumns: ColumnDef<UserReportSubmissionData>[] =
  [
    //Data Accessors
    {
      accessorKey: "eventRegistration.event.title",
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
      accessorKey: "SubmittedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Submit Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    // Data Action
    {
      id: "actions",
      cell: ({ row }) => {
        const userReport = row.original;

        console.log(userReport);
        return (
          <div className="flex items-center space-x-4">
            {/* Submit Report Button */}
            <AlertReportSubmitForm />

            {/* Delete File Button */}
            {/* <AlertReportDelete data={userReport.reportFile} /> */}
          </div>
        );
      },
    },
  ];
