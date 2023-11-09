import { db } from "./db";
import { getCurrentUser } from "./get-current-user";

const getConversationById = async (
  conversationsId: string
) => {
  try {
    const currentUser = await getCurrentUser()
    if(!currentUser?.phone){
      return null
    }
    const conversation =  await db.conversation.findUnique({
      where: {
        id: conversationsId
      },
      include: {
        users: true
      }
    })
    return conversation
    } catch (error: any) {
    return null  
  }
  
}
 
export default getConversationById;