import { redirectToSignIn } from "@clerk/nextjs";
import { getCurrentUser } from "./get-current-user";
import { db } from "./db";

const getConversations = async () => {
  const profile = await getCurrentUser()
  if (!profile) return redirectToSignIn()

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc'
      },
      where: {
        userIds: {
          has: profile.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    })
    return conversations;

  } catch (error) {
    return []
  }
}
 
export default getConversations;