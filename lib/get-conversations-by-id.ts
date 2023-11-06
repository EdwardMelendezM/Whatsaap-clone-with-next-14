import { db } from "./db";
import { currentProfile } from "./get-current-user";

const getConversationById = async (
  conversationsId: string
) => {
  try {
    const currentUser = await currentProfile()
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