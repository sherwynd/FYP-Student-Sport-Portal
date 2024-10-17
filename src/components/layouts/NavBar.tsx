import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Flex
        className="top-navigation-section"
        color="white"
        alignItems="center"
        bg="black"
        height="40px"
        justify="center"
        display={{ base: "none", sm: "flex" }}
      >
        {[
          ["Home", "/"],
          ["Event", "/event"],
          ["Profile", "/profile"],
          ["Admin", "/admin"],
          ["Login", "/login"],
          ["Register", "/register"],
        ].map(([title, url]) => (
          <Link key={url} as={NextLink} px={3} py={2} href={url}>
            {title}
          </Link>
        ))}
      </Flex>
    </nav>
  );
}
