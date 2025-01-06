"use client";

import { useActionState } from "react";
import { submitReportSubmission } from "../servers/submitReportSubmissionAction";
import UploadField from "@/components/common/UploadField";
import { Button } from "@/components/ui/button";

type UploadFileFormProps = {
  id: string;
  slug: string;
};
export default function UploadFileForm({ id, slug }: UploadFileFormProps) {
  const [data, action, _isPending] = useActionState(
    submitReportSubmission,
    undefined,
  );
  return (
    <form action={action}>
      <div className="file-input-container">
        <input type="hidden" name="reportSubmissionId" value={id} />
        <input type="hidden" name="slug" value={slug} />
        <UploadField
          label="Report File"
          type="file"
          name="reportFile"
          error={data?.reportFileError}
          accept=".pdf"
          helper=" Max 3Mb size"
        />
      </div>
      <Button>Submit</Button>
    </form>
  );
}
