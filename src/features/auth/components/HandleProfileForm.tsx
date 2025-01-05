"use client";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";

import { handleProfile } from "../servers/handleProfileAction";
import FormField from "@/components/common/FormField";
import { SelectField } from "@/components/common/SelectField";

type Gender = "male" | "female" | null;

type userDetailDataType = {
  id: string;
  slug: string;
  userDetail?: {
    id: string;
    gender?: Gender;
    dateOfBirth?: Date | null;
    age?: number | null;
    address?: string | null;
    university?: string | null;
    height?: string | null;
    weight?: string | null;
    bloodType?: string | null;
  } | null;
};

export default function HandleProfileForm({
  userData,
}: {
  userData: userDetailDataType | null;
}) {
  const [data, action, _isPending] = useActionState(handleProfile, undefined);
  const detail = userData?.userDetail;
  return (
    <form action={action}>
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Edit Profile
      </h2>
      <input type="hidden" name="userId" value={userData?.id || ""} />
      <input
        type="hidden"
        name="userDetailId"
        value={userData?.userDetail?.id || ""}
      />
      <input type="hidden" name="slug" value={userData?.slug || ""} />

      <div className="grid w-full items-start gap-2 p-4">
        <h2 className="mt-2 text-xl font-semibold text-gray-700">
          Basic Information
        </h2>
        <div className="grid grid-cols-2 items-start gap-4">
          <SelectField
            defaultValue={detail?.gender}
            label="Gender"
            name="gender"
            placeholder="Select your gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            error={data?.genderError}
          />
          <FormField
            label="Date Of Birth"
            type="date"
            name="dateOfBirth"
            error={data?.dateOfBirthError}
          />
        </div>

        <FormField
          defaultValue={detail?.age}
          label="Age"
          type="number"
          name="age"
          error={data?.ageError}
        />
        <FormField
          defaultValue={detail?.address}
          label="Address"
          type="text"
          name="address"
        />

        <h2 className="mt-2 text-xl font-semibold text-gray-700">Education</h2>
        <FormField
          defaultValue={detail?.university}
          label="University"
          type="text"
          name="university"
          error={data?.universityError}
        />

        <h2 className="mt-2 text-xl font-semibold text-gray-700">
          Physical Details
        </h2>
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            defaultValue={detail?.height}
            label="Height"
            type="number"
            name="height"
          />
          <FormField
            defaultValue={detail?.weight}
            label="Weight"
            type="number"
            name="weight"
          />
        </div>

        <SelectField
          defaultValue={detail?.bloodType}
          label="Blood Type"
          name="bloodType"
          placeholder="Select your Blood Type"
          options={[
            { value: "A+", label: "A+" },
            { value: "B+", label: "B+" },
            { value: "AB+", label: "AB+" },
            { value: "O+", label: "O+" },
            { value: "A-", label: "A-" },
            { value: "B-", label: "B-" },
            { value: "AB-", label: "AB-" },
            { value: "O-", label: "O-" },
          ]}
          error={data?.genderError}
        />

        <Button>Submit</Button>
      </div>
    </form>
  );
}
