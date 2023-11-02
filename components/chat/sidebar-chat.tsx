"use client"

import CreateChatButton from "./create-button-chat";
import FilterButtonChat from "./filter-button-chat";

const SidebarChat = () => {
  return ( 
    <div className="h-full flex flex-col gap-y-4 bg-zinc-800">
      <div className="mt-4 px-4 font-medium flex">
        <p className="text-2xl text-gray-200 flex-1">Chats</p>
        <CreateChatButton />
        <FilterButtonChat />
      </div>
    </div>
   );
}
 
export default SidebarChat;