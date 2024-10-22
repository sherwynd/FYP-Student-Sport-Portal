export { auth as middleware } from "@/auth";
import { MatcherConfig } from "@constants/auth/matcherConstant";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    MatcherConfig.staticFiles,
    // Always run for API routes
    MatcherConfig.apiRoutes,
  ],
};
