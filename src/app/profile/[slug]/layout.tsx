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

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="container mx-auto">
            {/* {profileData.canEdit ? (
              <button>Edit Profile</button>
            ) : (
              <p>You cannot edit this profile.</p>
            )} */}

            {/* Two Tabs Layout */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Left Tab: Profile */}
              <div className="rounded-lg bg-white p-4 text-center shadow md:w-1/3">
                <h2 className="mb-4 text-xl font-medium">
                  Profile Information : {profileUser.name}
                </h2>
                <div className="mb-4">
                  <Image
                    src={"/profile-template.png"}
                    alt="User Avatar"
                    width={150}
                    height={150}
                    className="mx-auto rounded-full"
                  />
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {profileUser.name || "User Name"}
                  </h2>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <p className="text-gray-600">
                    {profileUser.email || "User Email"}
                  </p>
                </div>
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
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-md">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
