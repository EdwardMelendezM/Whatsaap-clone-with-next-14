'use client'

import { MessageType } from "@/dtype"
import { cn } from "@/lib/utils"
import { useSession } from "@clerk/nextjs"
import { useState } from "react"
import { format } from "date-fns"

import AvatarOtherUser from "../conversations/avatar-other-user"
import {CheckCheckIcon} from "lucide-react";

interface ChatInputBoxProps{
  data: MessageType
  isLast?: boolean
}

const ChatItemBox = ({
  data,
  isLast
}: ChatInputBoxProps) => {

  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false);
  
  const isOwn = session?.session?.user?.phoneNumbers[0].phoneNumber === data.sender?.phone

  const seenList = (data.seen || [])
    .filter((user)=> user.phone !== data?.sender?.phone)
    .map(user=>user.name)
    .join(', ')

  const container = cn("flex gap-3 px-4 py-1", isOwn && 'justify-end')
  const avatar = cn(isOwn && "order-2")
  const body = cn("flex gap-2 bg-zinc-700 rounded-lg pr-14 relative max-w-[400px]", isOwn && "items-end bg-emerald-900 ")

  const message = cn("text-sm w-fit",
    isOwn ? 'text-gray-300': 'text-gray-300',
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  )

  return ( 
    // <div className={container}>
    //   <div className={avatar}>
    //     <AvatarOtherUser user={data.sender} />
    //   </div>
    //   <div className={body}>
    //     <div className="flex items-center gap-1">
    //       <div className="text-sm text-zinc-300">
    //         {data.sender.name}
    //       </div>
    //       <div className="text-xs text-gray-200">
    //         {format(new Date(data.createdAt), 'p')}
    //       </div>
    //     </div>
    //     <div className={message}>
    //       {data.body}
    //       {
    //         isLast && isOwn && seenList.length > 0 && (
    //           <div className="text-sx font-light text-gray-400">
    //             {`Visto by ${seenList}`}
    //           </div>
    //         )
    //       }
    //     </div>
    //   </div>
    // </div>
      <div className={container}>
        <div className={body}>
          <div className={message}>
            {data.body}
            {
                isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-400">
                      {`Visto by ${seenList}`}
                    </div>
                )
            }
          </div>
          <div className="absolute text-xs text-gray-400 bottom-1 right-2 flex gap-x-1">
            {format(new Date(data.createdAt), 'HH:mm')}
              {
                  isOwn && (
                      <CheckCheckIcon
                          className={cn(
                              "w-3 h-3",
                              isLast && isOwn && seenList.length > 0  ? "text-blue-500" : "text-gray-400"
                          )}
                      />
                  )
              }
          </div>
        </div>
      </div>
   );
}
 
export default ChatItemBox;