"use client";
import { useActionState } from "react";
import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/common/SelectField";
import { editUser } from "@/features/auth/servers/editUserAction";
import { deleteUser } from "@/features/auth/servers/deleteUserAction";

type UserFormProps = {
  initialData: {
    id: string;
    slug: string;
    name: string | null;
    role: string;
    isActive: boolean;
  } | null;
};

const EditUserForm = ({ initialData }: UserFormProps) => {
  const [data, updateAction, _isPending] = useActionState(editUser, undefined);
  const [_data, deleteAction, _isPendingDelete] = useActionState(
    deleteUser,
    undefined,
  );

  return (
    <div className="event-page my-6 flex min-h-screen items-center justify-center bg-gray-100">
      <div className="event-form w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h2 className="event-title-form mb-4 text-center text-2xl font-semibold">
          Edit User
        </h2>
        <form className="space-y-4" action={updateAction}>
          <input name="id" type="hidden" value={initialData?.id ?? ""} />
          <input name="slug" type="hidden" value={initialData?.slug ?? ""} />

          <FormField
            defaultValue={data?.fieldData.name || initialData?.name}
            label="Name"
            type="text"
            name="name"
            error={data?.nameError}
          />

          <SelectField
            defaultValue={data?.fieldData.role || initialData?.role}
            label="Role"
            name="role"
            options={[
              { value: "user", label: "Non-Student" },
              { value: "student", label: "Student" },
              { value: "university", label: "University" },
              { value: "organizer", label: "Organizer" },
              { value: "admin", label: "Admin" },
            ]}
            error={data?.roleError}
          />

          <Button
            type="submit"
            className="w-full rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Edit User
          </Button>
        </form>

        <form className="space-y-4" action={deleteAction}>
          <input name="id" type="hidden" value={initialData?.id ?? ""} />
          <Button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Delete User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
