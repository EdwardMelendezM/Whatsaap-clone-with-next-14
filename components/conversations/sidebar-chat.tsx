import getConversations from "@/lib/get-conversations";
import CreateChatButton from "./create-button-chat";
import FilterButtonChat from "./filter-button-chat";
import ListChat from "./list-chat";
import getUsers from "@/lib/get-users";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

const SidebarChat = async () => {

  const conversations = await getConversations()
  const users = await getUsers()
  const current = await currentUser()
  
  const userPhone = current?.phoneNumbers[0].phoneNumber!
  if (!userPhone){
    return redirectToSignIn()
  }
  
  return ( 
    <div className="h-full flex flex-col gap-y-4 bg-zinc-800 border-gray-900 border-r">
      <div className="mt-4 px-4 font-medium flex">
        <p className="text-2xl text-gray-200 flex-1">Chats</p>
        <CreateChatButton
          items={conversations}
          users={users}
          userPhone={userPhone} 
        />
        <FilterButtonChat />
      </div>
      <div className="px-4 flex-1">
        <ListChat
          items={conversations}
          userPhone={userPhone}
        />
      </div>
    </div>
   );
}
 
export default SidebarChat;