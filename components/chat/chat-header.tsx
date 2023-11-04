'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ChatCallButton } from "./chat-call-button"
import { ChatVideoButton } from "./chat-video-button"

interface ChatHeaderProps {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
}
const ChatHeader = ({
  name,
  type,
}: ChatHeaderProps) => {
  return ( 
    <div className="text-md font-semibold px-3 flex items-center h-[70px] border-neutral-900 border-b">
      {type === "conversation" && (
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            CN
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col text items-center justify-start pl-4">
        <p className="font-semibold text-md text-gray-200 text-medium">
          {name}
        </p>
        <p className="text-gray-400 font-light text-sm">
          Activo
        </p>
      </div>
      <div className="ml-auto flex items-center">
        {type === "conversation" && (
          <>
            <ChatVideoButton />
            <ChatCallButton />
          </>
        )}
      </div>
    </div>
   );
}
 
export default ChatHeader;