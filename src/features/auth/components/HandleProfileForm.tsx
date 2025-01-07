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
        <SelectField
          defaultValue={detail?.university}
          label="University"
          name="university"
          options={[
            { value: "Other University", label: "Other University" },
            {
              value: "Al-Madinah International University",
              label: "Al-Madinah International University",
            },
            { value: "Asia e University", label: "Asia e University" },
            {
              value: "Binary University of Management and Entrepreneurship",
              label: "Binary University of Management and Entrepreneurship",
            },
            {
              value: "City University of Malaysia",
              label: "City University of Malaysia",
            },
            {
              value: "DRB-HICOM University of Automotive Malaysia",
              label: "DRB-HICOM University of Automotive Malaysia",
            },
            { value: "HELP University", label: "HELP University" },
            {
              value: "INTI International University",
              label: "INTI International University",
            },
            {
              value: "Malaysia University of Science and Technology",
              label: "Malaysia University of Science and Technology",
            },
            {
              value: "Management and Science University",
              label: "Management and Science University",
            },
            {
              value: "Manipal International University",
              label: "Manipal International University",
            },
            { value: "Multimedia University", label: "Multimedia University" },
            { value: "Perdana University", label: "Perdana University" },
            {
              value: "Quest International University",
              label: "Quest International University",
            },
            { value: "Sunway University", label: "Sunway University" },
            { value: "Taylor's University", label: "Taylor's University" },
            { value: "UCSI University", label: "UCSI University" },
            {
              value: "UNITAR International University",
              label: "UNITAR International University",
            },
            { value: "Universiti AIMST", label: "Universiti AIMST" },
            {
              value: "Universiti Antarabangsa AlBukhary",
              label: "Universiti Antarabangsa AlBukhary",
            },
            {
              value: "Universiti Islam Antarabangsa Malaysia",
              label: "Universiti Islam Antarabangsa Malaysia",
            },
            {
              value: "Universiti Kebangsaan Malaysia",
              label: "Universiti Kebangsaan Malaysia",
            },
            {
              value: "Universiti Kuala Lumpur",
              label: "Universiti Kuala Lumpur",
            },
            { value: "Universiti Malaya", label: "Universiti Malaya" },
            {
              value: "Universiti Malaya-Wales",
              label: "Universiti Malaya-Wales",
            },
            {
              value: "Universiti Malaysia Kelantan",
              label: "Universiti Malaysia Kelantan",
            },
            {
              value: "Universiti Malaysia Pahang Al-Sultan Abdullah",
              label: "Universiti Malaysia Pahang Al-Sultan Abdullah",
            },
            {
              value: "Universiti Malaysia Perlis",
              label: "Universiti Malaysia Perlis",
            },
            {
              value: "Universiti Malaysia Sabah",
              label: "Universiti Malaysia Sabah",
            },
            {
              value: "Universiti Malaysia Sarawak",
              label: "Universiti Malaysia Sarawak",
            },
            {
              value: "Universiti Malaysia Terengganu",
              label: "Universiti Malaysia Terengganu",
            },
            {
              value: "Universiti Pendidikan Sultan Idris",
              label: "Universiti Pendidikan Sultan Idris",
            },
            {
              value: "Universiti Perubatan Antarabangsa",
              label: "Universiti Perubatan Antarabangsa",
            },
            {
              value: "Universiti Pertahanan Nasional Malaysia",
              label: "Universiti Pertahanan Nasional Malaysia",
            },
            {
              value: "Universiti Putra Malaysia",
              label: "Universiti Putra Malaysia",
            },
            {
              value: "Universiti Sains Islam Malaysia",
              label: "Universiti Sains Islam Malaysia",
            },
            {
              value: "Universiti Sains Malaysia",
              label: "Universiti Sains Malaysia",
            },
            { value: "Universiti Selangor", label: "Universiti Selangor" },
            {
              value: "Universiti Sultan Zainal Abidin",
              label: "Universiti Sultan Zainal Abidin",
            },
            {
              value: "Universiti Teknologi Kreatif Limkokwing",
              label: "Universiti Teknologi Kreatif Limkokwing",
            },
            {
              value: "Universiti Teknologi MARA",
              label: "Universiti Teknologi MARA",
            },
            {
              value: "Universiti Teknologi Malaysia",
              label: "Universiti Teknologi Malaysia",
            },
            {
              value: "Universiti Teknologi Petronas",
              label: "Universiti Teknologi Petronas",
            },
            {
              value: "Universiti Teknikal Malaysia Melaka",
              label: "Universiti Teknikal Malaysia Melaka",
            },
            {
              value: "Universiti Tenaga Nasional",
              label: "Universiti Tenaga Nasional",
            },
            {
              value: "Universiti Tunku Abdul Rahman",
              label: "Universiti Tunku Abdul Rahman",
            },
            {
              value: "Universiti Tun Abdul Razak",
              label: "Universiti Tun Abdul Razak",
            },
            {
              value: "Universiti Tun Hussein Onn Malaysia",
              label: "Universiti Tun Hussein Onn Malaysia",
            },
            {
              value: "Universiti Utara Malaysia",
              label: "Universiti Utara Malaysia",
            },
          ]}
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
