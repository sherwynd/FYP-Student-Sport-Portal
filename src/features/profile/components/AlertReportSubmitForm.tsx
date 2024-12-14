"use client";
// import React, { useState } from "react";
// import { FileUp } from "lucide-react";
import {
  AlertDialog,
  //   AlertDialogTrigger,
  //   AlertDialogContent,
  //   AlertDialogHeader,
  //   AlertDialogTitle,
  //   AlertDialogDescription,
  //   AlertDialogAction,
  //   AlertDialogCancel,
  //   AlertDialogFooter,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

export function AlertReportSubmitForm() {
  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   const newFile = e.target.files[0];
  //   if (newFile && newFile.type === "application/pdf") {
  //     setFile(newFile);
  //   } else {
  //     alert("Please select a valid PDF file.");
  //     setFile(null);
  //   }
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const files = e.dataTransfer.files;
  //   if (files && files[0] && files[0].type === "application/pdf") {
  //     setFile(files[0]);
  //   } else {
  //     alert("Please drop a valid PDF file.");
  //     setFile(null);
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault(); // Necessary to allow the drop event to fire
  // };

  // const handleSubmit = () => {
  //   if (!file) {
  //     alert("No file selected or file type is invalid.");
  //     return;
  //   }
  //   console.log("Submitting report:", file);
  //   // Submission logic to handle the PDF upload goes here
  // };

  return (
    <AlertDialog>
      {/* <AlertDialogTrigger asChild>
        <Button className="flex items-center bg-blue-500 hover:bg-blue-600">
          <FileUp />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Report</AlertDialogTitle>
          <AlertDialogDescription>
            You can only use pdf file to submit the report.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex w-full items-center justify-center border-4 border-dashed border-gray-300 p-6 text-center"
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="flex cursor-pointer flex-col items-center justify-center"
              >
                <FileUp size={24} className="text-blue-500" />
                <span className="mt-2 text-sm text-gray-500">
                  Drag and drop a PDF file here or click to select a file.
                </span>
              </label>
            </div>
            {file && (
              <span className="block text-center text-sm">
                File: {file.name}
              </span>
            )}
            <div className="flex w-full justify-end gap-4">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit} disabled={!file}>
                Submit
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent> */}
    </AlertDialog>
  );
}
