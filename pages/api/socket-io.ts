import {Server} from "socket.io"
import type {  NextApiResponse } from "next";
import {NextApiResponseServerIo, TYPE_CHAT_EVENT} from "@/dtype";
import {Server as NetServer} from "http";
import { Server as ServerIO } from "socket.io"

export default function ioHandler(
    req: NextApiResponse,
    res: NextApiResponseServerIo
) {
    try {
        if (!res.socket.server.io) {
            const path = "/api/socket-io"
            const httpServer: NetServer = res.socket.server as any
            const io = new ServerIO(httpServer, {
                path
            })

            io.on("connection", (socket) => {
                const {conversationId} = socket.handshake.query
                socket.join(conversationId as string)

                socket.on(TYPE_CHAT_EVENT.NEW_CHAT_MESSAGE_EVENT, message => {
                    io.in(conversationId as string).emit(TYPE_CHAT_EVENT.NEW_CHAT_MESSAGE_EVENT, message)
                })

            })
            res.socket.server.io = io

        } else {
            console.log("socket io already running")
        }
        res.end();
    } catch (error) {
        console.log("[SOCKET_IO_ERROR]", error)
        res.status(500).json({error: error})

    }
}
export const config = {
    api: {
        bodyParser: false
    }
}