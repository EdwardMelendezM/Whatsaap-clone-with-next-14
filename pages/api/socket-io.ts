import {Server} from "socket.io"
import type { NextApiRequest,  NextApiResponse } from "next";

export default function ioHandler(
    req: NextApiResponse,
    res: NextApiResponse
) {
    if(!(res.socket as any).socket.io) {
        console.log("First use, starting socket io")

        const io = new Server((res.socket as any).server)

        io.on("connection", socket => {
            console.log(`${socket.id} connected`)
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