"use client";
import { useState, useActionState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Shadcn Checkbox
import FormField from "@/components/common/FormField";
import TextareaField from "@/components/common/TextareaField";
import { SelectField } from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";
import DragAndDropImage from "@/components/common/DragAndDropImage";
import UploadFile from "@/components/common/UploadFile";
import { editEvent } from "../servers/editEventAction";

type EventFormProps = {
  actionType: "Create" | "Edit";
  initialData?: {
    id: string;
    title: string;
    description: string;
    courseLevel: string;
    creditHour: number;
    eventCertificate?: {
      id: string;
    } | null;
    eventImage?: {
      id: string;
    } | null;
  };
};

const EditEventForm = ({ actionType, initialData }: EventFormProps) => {
  const [data, action, _isPending] = useActionState(editEvent, undefined);
  const [requireService, setRequireService] = useState(false);

  return (
    <div className="event-page my-6 flex min-h-screen items-center justify-center bg-gray-100">
      <div className="event-form w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h2 className="event-title-form mb-4 text-center text-2xl font-semibold">
          {actionType} Event Form
        </h2>
        <form className="space-y-4" action={action}>
          <input name="eventId" type="hidden" value={initialData?.id ?? ""} />
          <input
            name="eventImageId"
            type="hidden"
            value={initialData?.eventImage?.id ?? ""}
          />
          <input
            name="eventCertificateId"
            type="hidden"
            value={initialData?.eventCertificate?.id ?? ""}
          />
          <DragAndDropImage name="eventImage" />
          <FormField
            label="Title"
            type="text"
            name="title"
            defaultValue={initialData?.title ?? data?.fieldData?.title ?? ""}
            error={data?.titleError}
          />
          <TextareaField label="Description" rows={4} name="description" />
          <SelectField
            label="Course Level"
            name="courseLevel"
            options={[
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "professional", label: "Professional" },
            ]}
          />
          <SelectField
            label="Event Type"
            name="eventType"
            options={[
              { value: "course", label: "Course" },
              { value: "workshop", label: "Workshop" },
              { value: "competition", label: "Competition" },
            ]}
          />
          <FormField
            label="Credit Hour"
            type="number"
            name="creditHour"
            error={data?.creditHourError}
          />
          <UploadFile label="Certificate" limitSize={5} name="certificate" />
          {/* Checkbox for Require Service */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="requireService"
              checked={requireService}
              onCheckedChange={(checked) =>
                setRequireService(checked as boolean)
              }
            />
            <label
              htmlFor="requireService"
              className="text-sm font-medium text-gray-700"
            >
              Require Service?
            </label>
          </div>
          {/* Conditional FormField for Number of People */}
          {requireService && (
            <FormField
              label="Number of People"
              type="number"
              name="numberOfPeople"
              error={data?.numberOfPeopleError}
            />
          )}
          <Button
            type="submit"
            className="w-full rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
