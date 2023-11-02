"use client"
import { CheckCheckIcon, Users2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface UserItemChatProps{
  isMessage?: boolean;
  isSeen?: boolean;
}


const UserItemChat = ({
  isMessage,
  isSeen
}: UserItemChatProps) => {
  return ( 
    <Button
      className={cn(
        "hover:bg-zinc-700 bg-zinc-800 h-[60px] px-3  flex justify-start items-center gap-x-4 w-[245px]",
      )}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Users2 className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      {/* <div className="rounded-full p-3 bg-zinc-700/70">
        <Users2 className="w-4 h-4 text-gray-400" />
      </div> */}
      {/* <div className="flex-1 text-start px-4 font-medium text-gray-300">
        Nuevo grupo
      </div> */}
      <div className="flex-1">
        <div className="flex">
          <p className="text-start font-medium text-gray-300 truncate flex-1">
            Noa
          </p>
          <p className="text-xs text-gray-400">13/10/2023</p>
        </div>
        <p className="mt-1 text-start  text-xs text-gray-400 truncate flex gap-x-1">
          {isMessage && isSeen && <CheckCheckIcon className="w-4 h-4 text-blue-500" />}
          {isMessage && !isSeen && <CheckCheckIcon className="w-4 h-4 " />}
          Yerson: Por cierto, la entr..
        </p>
      </div>
    </Button>
   );
}
 
export default UserItemChat;