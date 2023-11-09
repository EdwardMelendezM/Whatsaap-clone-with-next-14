"use client"

import { CheckCheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ConversationType } from "@/dtype";
import { format } from "date-fns"
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation"
import AvatarOtherUser from "./avatar-other-user";
import useOtherUser from "@/hook/use-other-user";
import { redirectToSignIn } from "@clerk/nextjs";

interface UserItemChatProps{
  selected?: boolean
  data: ConversationType
  profilePhone?: string
}

const UserItemChat = ({
  data,
  selected,
  profilePhone
}: UserItemChatProps) => {
  
  const router = useRouter()

  const lastMessage = useMemo(()=>{
    const message = data.messages || []

    return message[message.length-1]
  },[data.messages])


  const hasSeen = useMemo(()=>{
    if(!lastMessage) return false
    const seenArray = lastMessage.seen || []
    return seenArray.filter((profile) => profile?.phone === profilePhone ).length!==0
  }, [profilePhone, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Empieza a chatear!';
  }, [lastMessage]);

  if (!profilePhone!) {
    return redirectToSignIn()
  }

  const otherProfile = useOtherUser(data, profilePhone)
  const a = 0
  const handleClick = useCallback(()=>{
    router.push(`/chat/${data.id}`)
  },[])

  return ( 
    <Button
      onClick={handleClick}
      className={cn(
        "hover:bg-zinc-700 bg-zinc-800 h-[60px] px-3  flex justify-start items-center gap-x-4 w-[245px]",
        selected && "bg-zinc-700"
      )}>
      <AvatarOtherUser  />
      <div className="flex-1">
        <div className="flex">
          <p className="text-start font-medium text-gray-300 truncate flex-1">
            {data.name}
          </p>
          <p className="text-xs text-gray-400">
            {/* // TODO */}
            {lastMessage && format(new Date(lastMessage?.createdAt), 'p')}
          </p>
        </div>
        <p className="mt-1 text-start  text-xs text-gray-400 truncate flex gap-x-1">
           
           {
            !data.isGroup && (
              <CheckCheckIcon
                className={cn(
                  "w-4 h-4 ",
                  hasSeen ? "text-blue-500" : "text-gray-400"
                )} />
            )
           }
          {lastMessageText}
        </p>
      </div>
    </Button>
   );
}
 
export default UserItemChat;