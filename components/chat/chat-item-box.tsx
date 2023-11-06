'use client'

import { MessageType } from "@/dtype"
import { cn } from "@/lib/utils"
import { useSession } from "@clerk/nextjs"
import { useState } from "react"
import { format } from "date-fns"

import AvatarOtherUser from "../conversations/avatar-other-user"

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
  
  const isOwn = session?.session?.user?.phoneNumbers[0].phoneNumber === data.senderId

  const seenList = (data.seen || [])
    .filter((user)=> user.phone !== data?.sender?.phone)
    .map(user=>user.name)
    .join(', ')

  const container = cn("flex gap-3 p-4", isOwn && 'justify-end')
  const avatar = cn(isOwn && "order-2")
  const body = cn("flex flec-ol gap-2", isOwn && "items-end")

  const message = cn("item-sm w-fit overflow-hidden",
    isOwn ? 'bg-sky-500 text-white': 'bg-zinc-800 text-gray-300',
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  )

  return ( 
    <div className={container}>
      <div className={avatar}>
        <AvatarOtherUser profile={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-zinc-300">
            {data.sender.name}
          </div>
          <div className="text-sx text-gray-200">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {
            isLast && isOwn && seenList.length > 0 && (
              <div className="text-sx font-light text-gray-400">
                {`Visto by ${seenList}`}
              </div>
            )
          }
        </div>
      </div>
    </div>
   );
}
 
export default ChatItemBox;