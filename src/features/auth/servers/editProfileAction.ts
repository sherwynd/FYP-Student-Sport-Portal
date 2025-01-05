"use server";
import prisma from "@/databases/db";
import { redirect } from "next/navigation";

export const editProfile = async (
  _previousState: unknown,
  formData: FormData,
) => {
  const userId = formData.get("userId") as string;
  const userSlug = formData.get("slug") as string;
  const userDetailId = formData.get("userDetailId") as string;
  const gender = formData.get("gender") as "male" | "female";
  const dateOfBirthStr = formData.get("dateOfBirth") as string;
  const age = Number(formData.get("age"));
  const address = formData.get("address") as string;
  const university = formData.get("university") as string;
  const height = formData.get("height") as string;
  const weight = formData.get("weight") as string;
  const bloodType = formData.get("bloodType") as string;

  const dateOfBirth = dateOfBirthStr ? new Date(dateOfBirthStr) : null;

  if (!gender) {
    return {
      genderError: "Please provide gender given on list",
      fieldData: {
        gender,
        dateOfBirthStr,
        age,
        address,
        university,
        height,
        weight,
        bloodType,
      },
    };
  }

  if (!dateOfBirth) {
    return {
      dateOfBirthError: "Please provide your Date Of Birth",
      fieldData: {
        gender,
        dateOfBirth,
        age,
        address,
        university,
        height,
        weight,
        bloodType,
      },
    };
  }

  if (!age) {
    return {
      ageError: "Please provide age",
      fieldData: {
        gender,
        dateOfBirth,
        age,
        address,
        university,
        height,
        weight,
        bloodType,
      },
    };
  }

  if (!university) {
    return {
      universityError: "Please provide university",
      fieldData: {
        gender,
        dateOfBirth,
        age,
        address,
        university,
        height,
        weight,
        bloodType,
      },
    };
  }

  if (userDetailId) {
    await prisma.userDetail.update({
      where: { id: userDetailId },
      data: {
        gender: gender,
        age: age,
        university: university,
        dateOfBirth: dateOfBirth,
        address: address,
        height: height,
        weight: weight,
        bloodType: bloodType,
      },
    });
  } else {
    await prisma.userDetail.create({
      data: {
        gender: gender,
        age: age,
        university: university,
        dateOfBirth: dateOfBirth,
        address: address,
        height: height,
        weight: weight,
        bloodType: bloodType,
        userId: userId,
      },
    });
  }
  redirect(`/profile/${userSlug}`);
};
