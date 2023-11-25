import type {NextApiRequest} from "next";
import {NextApiResponseServerIo, TYPE_CHAT_EVENT} from "@/dtype";
import {getCurrentUserPages} from "@/lib/get-current-user-pages";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    try {
        if(req.method !== "POST" ){
            return res.status(405).json({error: "Method not alloweb"})
        }
        const currentUser = await getCurrentUserPages(req)

        const {
            message,
            // image,
            conversationId
        } = req.body



        if(!currentUser?.id || !currentUser?.phone){
            return new NextResponse("Unauthorized", {status:401})
        }


        const newMessage = await db.message.create({
            include: {
                seen:true,
                sender: true,
            },
            data: {
                body: message,
                // image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        const updatedConvesation = await db.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages : {
                    include: {
                        seen: true
                    }
                }
            }
        })
        const channelKey = `chat:${conversationId}:message:update`
        res?.socket?.server?.io?.emit(channelKey, newMessage)
        return res.status(200).json(newMessage)
    } catch (error) {
        console.log("[SOCKET_IO_ERROR]", error)
        res.status(500).json({error: error})
    }
}
