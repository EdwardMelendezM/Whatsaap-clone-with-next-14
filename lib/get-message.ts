import { db } from "./db";

const getMessages = async (
  chatId: string,
) => {
  try {
    return await db.message.findMany({
      where:{
        conversationId: chatId
      },
      include:{
        sender: true,
        seen: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  } catch (error: any) {
    return []
  }
}
 
export default getMessages;