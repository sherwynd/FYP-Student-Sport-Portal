"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "../servers/deleteEventAction";
import { useRouter } from "next/navigation";

export default function DeleteAlertBox({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteEvent(id);
      if (result.success) {
        router.push("/event"); // Navigate to the events list
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="mb-4 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
          Delete Event
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete your event
            from our data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
