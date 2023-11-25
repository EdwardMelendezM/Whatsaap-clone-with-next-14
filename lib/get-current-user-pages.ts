import { getAuth } from "@clerk/nextjs/server"
import { db } from "./db"
import { NextApiRequest } from "next"

export const getCurrentUserPages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req)

    if(!userId){
        return null
    }
    return  await db.user.findUnique({
        where:{
            userId
        }
    })
}