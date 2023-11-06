import { db } from "./db";

const getMessages = async (
  chatId: string,
) => {
  try {
    const messages = await db.message.findMany({
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

    return messages
  } catch (error: any) {
    return []
  }
}
 
export default getMessages;