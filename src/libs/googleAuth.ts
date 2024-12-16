import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_REDIRECT_URL
    : process.env.DEVELOPMENT_REDIRECT_URL,
);

export default oauth2Client;
