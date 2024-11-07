import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <footer>
      <Flex
        className="top-navigation-section"
        color="white"
        alignItems="center"
        bg="black"
        minHeight="40px"
        justify="center"
      >
        {[
          ["Privacy", "/"],
          ["Term", "/"],
        ].map(([title, url]) => (
          <Link key={title} as={NextLink} px={3} py={2} href={url}>
            {title}
          </Link>
        ))}
      </Flex>
    </footer>
  );
}
