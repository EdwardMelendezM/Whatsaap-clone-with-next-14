'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ChatCallButton } from "./chat-call-button"
import { ChatVideoButton } from "./chat-video-button"
import {Loader2} from "lucide-react";

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
    <div className="text-md font-semibold px-3 flex items-center h-[80px] border-neutral-900 border-b">
      {type === "conversation" && (
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
              <Loader2
                  className="h-4 w-4 text-zinc-500 animate-spin"
              />
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col text items-start justify-center pl-4">
        <p className="font-semibold text-md text-gray-200 text-medium">
          {name}
        </p>
        <p className="text-gray-400 font-light text-sm">
          {/* en linea */}
          ult. vez hoy a la(s) 08:33
        </p>
      </div>
      <div className="ml-auto flex items-center">
        {type === "conversation" && (
          <div>
            <ChatVideoButton />
            <ChatCallButton />
          </div>
        )}
      </div>
    </div>
   );
}
 
export default ChatHeader;