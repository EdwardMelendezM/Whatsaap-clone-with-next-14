import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

const initialUser = async () => {
  const initialCurrent = await currentUser()
  if (!initialCurrent){
    return redirectToSignIn()
  }

  const user = await db.user.findUnique({
    where: {
      userId: initialCurrent.id
    }
  })

  if(user){
    return user
  }

  const newProfile = await db.user.create({
    data:{
      userId: initialCurrent.id,
      name: `${initialCurrent.firstName} ${initialCurrent.lastName}`,
      imageUrl: initialCurrent.imageUrl,
      email: initialCurrent.emailAddresses[0].emailAddress,
      phone: initialCurrent.phoneNumbers[0].phoneNumber,
    }
  })

  return newProfile
}
 
export default initialUser;