import { NextResponse } from "next/server";
import oauth2Client from "@/libs/googleAuth";
import axios from "axios";
import prisma from "@/databases/db";
import { createSession } from "@/libs/session";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: "Google OAuth Error " + error });
  }

  if (!code) {
    return NextResponse.json({ error: "Authorization code not found " });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        },
      );

      let matchUser = await prisma.user.findUnique({
        where: {
          email: response.data.email,
        },
      });

      if (!matchUser) {
        matchUser = await prisma.user.create({
          data: {
            name: response.data.name,
            slug: response.data.name.replace(/\s+/g, "-").toLowerCase(),
            email: response.data.email,
            emailVerified: new Date(),
          },
        });
      }

      await createSession(matchUser.id, matchUser.role, matchUser.slug);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    return NextResponse.json({
      error: "Google OAuth Error failed to exchange code" + error,
    });
  }
}
