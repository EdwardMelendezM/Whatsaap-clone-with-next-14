import type {NextApiRequest} from "next";
import {NextApiResponseServerIo} from "@/dtype";
import {Server as NetServer} from "http";
import { Server as ServerIO } from "socket.io"

export default async function ioHandler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    try {
        if (!res.socket.server.io) {
            const path = "/api/socket-io"
            const httpServer: NetServer = res.socket.server as any
            const io = new ServerIO(httpServer, {
                path
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