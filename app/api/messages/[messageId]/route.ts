import {NextResponse} from "next/server";

import {getCurrentUser} from "@/lib/get-current-user";
import {db} from "@/lib/db";

interface IParams {
    messageId: string
}

export async function PUT(
    request: Request,
    {params}: { params: IParams }
) {
    try {
        const {messageId} = params
        const body = await request.json()
        const currentUser = await getCurrentUser()

        const {
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

export async function DELETE(
    request: Request,
    {params}: { params: IParams }
) {
    try {
        const {messageId} = params
        const currentUser = await getCurrentUser()

        if (!currentUser?.id || !currentUser?.phone) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const deleteMessage = await db.message.update({
            where: {
                id: messageId
            },
            data: {
                isDeleted: true,
            }
        })

        return NextResponse.json(deleteMessage)
    } catch (error) {
        console.log(error, "[ERROR_DELETE_MESSAGE]")
        return new NextResponse("Internal Server Error", {status: 500})
    }

}