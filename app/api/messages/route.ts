import {getCurrentUser} from "@/lib/get-current-user";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const {
            message,
            image,
            conversationId
        } = body

        if (!currentUser?.id || !currentUser?.phone) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const newMessage = await db.message.create({
            include: {
                seen: true,
                sender: true,
            },
            data: {
                body: message,
                image: image,
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

        await db.conversation.update({
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
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        return NextResponse.json(newMessage)
    } catch (error) {
        console.log(error, "[ERROR_MESSAGE]")
        return new NextResponse("Internal Server Error", {status: 500})
    }

}


export async function PUT(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const {
            messageId,
            conversationId,
            message
        } = body

        if (!currentUser?.id || !currentUser?.phone) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const updateMessage = await db.message.update({
            where: {
                id: messageId
            },
            data: {
                body: {
                    message
                },
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
            },
            include: {
                seen: true,
                sender: true,
            }
        })

        return NextResponse.json(updateMessage)
    } catch (error) {
        console.log(error, "[ERROR_UPDATE_MESSAGE]")
        return new NextResponse("Internal Server Error", {status: 500})
    }

}