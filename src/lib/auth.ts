import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getAccessToken() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Unauthorized: Access token not found");
  }

  return session.accessToken;
}
