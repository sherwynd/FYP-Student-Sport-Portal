import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { verifySession } from "@/libs/dal";
import prisma from "@/databases/db";
import { getProfileDTO } from "@/libs/dto";
import React from "react";

type ProfileLayoutProps = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = async ({
  params,
  children,
}) => {
  const currentUser = await verifySession();
  const profileUser = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });
  const { slug } = await params;
  const profileData = await getProfileDTO(slug, currentUser?.userId as String);

  const formatDate = (dateTime: string | Date) => {
    const date = new Date(dateTime);
    return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  };

  // Usage
  const formattedDate = formatDate(profileUser?.createdAt as Date);

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        {/* Two Tabs Layout */}
        <div className="flex flex-col items-start gap-4 md:flex-row">
          {/* Left Tab: Profile */}
          <div className="mx-auto max-w-md flex-shrink-0 rounded-lg bg-white p-6 text-center shadow-lg md:w-1/3">
            {/* Profile Header */}
            <div className="mb-6">
              <Image
                src="/profile-template.png"
                alt="User Avatar"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {profileUser.name || "User Name"}
              </h2>
              <p className="text-sm text-gray-500">
                {profileUser.email || "User Email"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {/* Status */}
              <div className="text-left">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <p
                  className={`text-lg font-semibold ${profileUser.isActive ? "text-green-600" : "text-red-600"}`}
                >
                  {profileUser.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              {/* Join Date */}
              <div className="text-left">
                <label
                  htmlFor="join-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Join Date
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-600">
                  {formattedDate || "N/A"}
                </p>
              </div>
            </div>

            {profileData.canEdit ? (
              <div className="mt-6">
                <Link href={`/profile/${slug}/editProfile`}>
                  <button className="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-600">
                    Edit Profile
                  </button>
                </Link>
              </div>
            ) : (
              <></>
            )}
            {/* Edit Button */}
          </div>

          {/* Right Tab */}
          <div className="flex flex-col gap-4 md:w-2/3">
            {/* Top Section: Navigation Menu */}
            <div className="rounded-lg bg-white p-4 shadow-md">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href={`/profile/${slug}`} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Detail
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/eventHistory`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Event History
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/dashboard`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/certificate`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Certificate
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/report`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Report
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  {currentUser?.role === "admin" && (
                    <NavigationMenuItem>
                      <Link
                        href={`/profile/${slug}/service`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Service
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
