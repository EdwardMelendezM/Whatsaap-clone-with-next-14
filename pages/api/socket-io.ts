import {Server} from "socket.io"
import type {  NextApiResponse } from "next";
import {TYPE_CHAT_EVENT} from "@/dtype";

export default function ioHandler(
    req: NextApiResponse,
    res: NextApiResponse
) {
    if (!(res.socket as any).server.io) {
        console.log("First use, starting socket io")

        const io = new Server((res.socket as any).server)

        io.on("connection", socket => {
            console.log(`${socket.id} connected`)

            //Join a conversations
            const {conversationId} = socket.handshake.query
            socket.join(conversationId as string)
            //
            // io.in(conversationId as string).emit(TYPE_CHAT_EVENT.USER_JOIN_CHAT_EVENT,"CONECTADO" )

            socket.on(TYPE_CHAT_EVENT.NEW_CHAT_MESSAGE_EVENT, message => {
                io.in(conversationId as string).emit(TYPE_CHAT_EVENT.NEW_CHAT_MESSAGE_EVENT, message)
            })
        })
    } else {
        console.log("socket io already running")
    }
    res.end();
}

export const config = {
    api: {
        bodyParser: false
    }
}