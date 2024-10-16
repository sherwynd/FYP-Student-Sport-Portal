import Image from "next/image";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex
      className="header-section"
      color="black"
      alignItems="center"
      bg="blue.200"
    >
      <Image
        src="/HeaderLogo.png"
        width={80}
        height={80}
        alt=""
        className="m-2"
      />
      <Spacer />
      <Text fontSize="xl" display={{ base: "none", sm: "block" }}>
        Student Sport Portal
      </Text>

      <Spacer />
      <Link href={`login`}>
        <Button margin={{ base: "10px", sm: "20px", md: "30px" }}>Login</Button>
      </Link>
    </Flex>
  );
}
