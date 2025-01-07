"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type UserCertificateData = {
  id: string;
  filename: string;
  contentType: string;
  downloadUrl: string;
};

export const UserCertificateColumns: ColumnDef<UserCertificateData>[] = [
  //Data Accessors
  {
    accessorKey: "filename",
    //Sorting
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Certificate Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  // Data Action
  {
    id: "actions",
    cell: ({ row }) => {
      const eventCertficate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                const downloadUrl = eventCertficate.downloadUrl;
                const filename = eventCertficate.filename;

                if (!downloadUrl || !downloadUrl.startsWith("data:")) {
                  console.error("Invalid Base64 URL or file not found.");
                  return;
                }

                console.log("Downloading:", filename, "from URL:", downloadUrl);

                try {
                  const link = document.createElement("a");
                  link.href = downloadUrl; // Use the base64 data URL
                  link.download = filename; // Set the filename for download
                  document.body.appendChild(link); // Append link to the DOM (some browsers require this)
                  link.click(); // Trigger the download
                  document.body.removeChild(link); // Clean up the DOM
                } catch (error) {
                  console.error("Failed to download file:", error);
                }
              }}
            >
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
