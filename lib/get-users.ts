import { redirectToSignIn } from "@clerk/nextjs";
import { getCurrentUser } from "./get-current-user";
import { db } from "./db";

const getUsers = async () => {
  const profile = await getCurrentUser()
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