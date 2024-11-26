import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]/options";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div>
        <h1>Session Information:</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>

        <div className="min-h-screen bg-gray-100 p-4">
          <div className="container mx-auto">
            <h1 className="mb-6 text-center text-2xl font-semibold">
              My Profile
            </h1>

            {/* Two Tabs Layout */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Left Tab: Profile */}
              <div className="rounded-lg bg-white p-4 text-center shadow md:w-1/3">
                <h2 className="mb-4 text-xl font-medium">
                  Profile Information
                </h2>
                <div className="mb-4">
                  <Image
                    src={
                      session?.user?.image
                        ? session.user.image
                        : "/profile-template.png"
                    }
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
                    {session?.user?.name || "User Name"}
                  </h2>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <p className="text-gray-600">
                    {session?.user?.email || "User Email"}
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
                        <Link href="/profile/" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            Detail
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link
                          href="/profile/eventHistory"
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
                          href="/profile/dashboardDetail"
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
}