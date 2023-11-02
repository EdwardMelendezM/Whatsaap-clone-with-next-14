"use client"
import { Users2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const UserItemChat = () => {
  return ( 
    <Button
      className="flex-1 hover:bg-zinc-700 bg-zinc-800">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <Users2 className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      {/* <div className="rounded-full p-3 bg-zinc-700/70">
        <Users2 className="w-4 h-4 text-gray-400" />
      </div> */}
      <div className="flex-1 text-start px-4 font-medium text-gray-300">
        Nuevo grupo
      </div>
    </Button>
   );
}
 
export default UserItemChat;