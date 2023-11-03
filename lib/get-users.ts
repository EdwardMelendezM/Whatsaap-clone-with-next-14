import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "./get-current-user";
import { db } from "./db";

const getProfiles = async () => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  try {
    const users = await db.profile.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        NOT: {
          phone: profile.phone
        }
      }
    })
    return users

  } catch (error) {
    return []
  }
}
 
export default getProfiles;