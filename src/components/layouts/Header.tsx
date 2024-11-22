import Image from "next/image";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
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
        <Link href="/login">
          <Button margin={{ base: "10px", sm: "20px", md: "30px" }}>
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}
