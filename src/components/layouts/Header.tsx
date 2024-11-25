import Image from "next/image";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@api/auth/[...nextauth]/options";

export default async function Header() {
  const session = await getServerSession(options);
  return (
    <header className="w-full bg-blue-300">
      {/* Wrapper for 1440px constraint */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2">
        <Flex alignItems="center">
          <Image
            src="/HeaderLogo.png"
            width={80}
            height={80}
            alt="Logo"
            className="m-2"
            priority={true}
          />
          <Spacer />
        </Flex>
        <Text fontSize="xl" fontWeight="bold">
          Student Sport Portal
        </Text>
        <Spacer />
        {session ? (
          <Text fontSize="xl" fontWeight="bold">
            Admin Mode
          </Text>
        ) : (
          <Link href="/login">
            <Button margin={{ base: "10px", sm: "20px", md: "30px" }}>
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
