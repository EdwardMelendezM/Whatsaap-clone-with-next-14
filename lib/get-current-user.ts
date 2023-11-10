import { auth, redirectToSignIn } from "@clerk/nextjs"
import { db } from "./db"

export const getCurrentUser = async() => {
  const {userId} = auth()

  if(!userId) return null

  const user = await db.user.findUnique({
    where: {
      userId
    }
  })

  if (!user) return redirectToSignIn()
  
  return user
}
