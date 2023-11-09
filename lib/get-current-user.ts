import { auth, redirectToSignIn } from "@clerk/nextjs"
import { db } from "./db"

export const getCurrentUser = async() => {
  const {userId} = auth()

  if(!userId) return null

  const profile = await db.user.findUnique({
    where: {
      userId
    }
  })

  if (!profile) return redirectToSignIn()
  
  return profile
}
