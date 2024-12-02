import "server-only";
import { getUserBySlug } from "@/libs/dal";
import { User } from "@prisma/client";

function canEditProfile(currentUserId: String, user: User) {
  return currentUserId === user.id; // Can only edit their own profile
}

export async function getProfileDTO(slug: string, currentUserId: String) {
  const user = await getUserBySlug(slug);

  // Or return only what's specific to the query here
  return {
    canEdit: canEditProfile(currentUserId, user as User),
  };
}
