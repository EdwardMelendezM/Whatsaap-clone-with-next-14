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
import { useSession } from "@clerk/nextjs";

interface UserItemChatProps{
  selected?: boolean
  data: ConversationType
}

const UserItemChat = ({
  data,
  selected,
}: UserItemChatProps) => {
  
  const router = useRouter()

  const lastMessage = useMemo(()=>{
    const message = data.messages || []

    return message[message.length-1]
  },[data.messages])

  const session = useSession()
  const profilePhone = session?.session?.user?.primaryPhoneNumber?.phoneNumber
  if(!profilePhone){
    return
  }

  const hasSeen = ()=> {
    if(!lastMessage) return false
    const seenArray = lastMessage.seen || []
    return seenArray.filter((profile) => profile?.phone === profilePhone ).length!==0
  }

  const lastMessageText = () => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Empieza a chatear!';
  };

  const otherProfile = useOtherUser(data, profilePhone)
  const handleClick = ()=>{
    //TODO USECALLBACK
    router.push(`/conversations/${data.id}`)
  }

  return ( 
    <Button
      onClick={handleClick}
      className={cn(
        "bg-transparent hover:bg-zinc-700 bg-zinc-800 h-[60px] px-3  flex justify-start items-center gap-x-4 w-[245px]",
        selected && "bg-zinc-700"
      )}>
      <AvatarOtherUser user={otherProfile} />
      <div className="flex-1">
        <div className="flex">
          <p className="text-start font-medium text-gray-300 truncate flex-1">
            {otherProfile?.name}
          </p>
          <p className="text-xs text-gray-400">
            {/* // TODO */}
            {lastMessage && format(new Date(lastMessage?.createdAt), 'p')}
          </p>
        </div>
        <p className="mt-1 text-start  text-xs text-gray-400 truncate flex gap-x-1">
           
           {
            !data.isGroup && lastMessageText() !== "Empieza a chatear!" && (
              <CheckCheckIcon
                className={cn(
                  "w-4 h-4 ",
                  hasSeen()  ? "text-blue-500" : "text-gray-400"
                )} />
            )
           }
          {lastMessageText()}
        </p>
      </div>
    </Button>
   );
}
 
export default UserItemChat;