import {NextApiRequest, NextApiResponse} from 'next';
import {getCurrentUser} from "@/lib/get-current-user";
import {db} from "@/lib/db";
import {getCurrentUserPages} from "@/lib/get-current-user-pages";

interface IParams {
    messageId: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: {id},
        method,
    } = req;

    switch (method) {
        case 'PUT':
            return handlePutRequest(req, res, id);
        case 'DELETE':
            return handleDeleteRequest(req, res, id);
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Método ${method} no permitido`);
    }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse, messageId: string | string[]) {
    try {
        const body = await req.body;
        const currentUser = await getCurrentUserPages(req)

        const {conversationId, message} = body;

        if (!currentUser?.id || !currentUser?.phone) {
            return res.status(401).json("Unauthorized");
        }

        const updateMessage = await db.message.update({
            where: {
                id: messageId
            },
            data: {
                body: message,
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
        });

        return res.status(200).json(updateMessage);
    } catch (error) {
        console.error(error, "[ERROR_UPDATE_MESSAGE]");
        return res.status(500).json("Internal Server Error");
    }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse, messageId: string | string[]) {
    try {
        const currentUser = await getCurrentUserPages(req)

        if (!currentUser?.id || !currentUser?.phone) {
            return res.status(401).json("Unauthorized");
        }

        const deleteMessage = await db.message.update({
            where: {
                id: messageId
            },
            data: {
                isDeleted: true,
            }
        });

        return res.status(200).json(deleteMessage);
    } catch (error) {
        console.error(error, "[ERROR_DELETE_MESSAGE]");
        return res.status(500).json("Internal Server Error");
    }
}