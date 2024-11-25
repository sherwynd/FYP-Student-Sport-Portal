export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
// Unable to move into constant in NextJS 15 for dynamic
