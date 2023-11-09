import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "./get-current-user";
import { db } from "./db";

const getUsers = async () => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  try {
    const users = await db.user.findMany({
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
 
export default getUsers;