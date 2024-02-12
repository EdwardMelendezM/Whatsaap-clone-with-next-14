import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/get-current-user"
import {NextResponse} from "next/server"

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const {
            profileId,
            isGroup,
            members,
            name
        } = body

        if (!currentUser?.id || !currentUser?.phone) {
            return new NextResponse("Unauthorized", {status: 400})
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid data", {status: 400})
        }

        if (isGroup) {
            const newConversation = await db.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })

            newConversation.users.forEach((user) => {
                if (user.phone) {
                    //Use Socket
                }
            })

            return NextResponse.json(newConversation)
        }

        const existingConversations = await db.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, profileId]
                        }
                    },
                    {
                        userIds: {
                            equals: [profileId, currentUser.id]
                        }
                    }
                ]
            }
        })

        const singleConversation = existingConversations[0]

        if (singleConversation) {
            return NextResponse.json(singleConversation)
        }

        const newConversation = await db.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: profileId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        newConversation.users.map(user => {
            if (user.phone) {
                //Use Socket
            }
        })

        return NextResponse.json(newConversation)
    } catch (error) {
        return new NextResponse("Internal Error", {status: 500})
    }

}

