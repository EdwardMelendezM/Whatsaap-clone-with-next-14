import getConversations from "@/lib/get-conversations";
import CreateChatButton from "./create-button-chat";
import FilterButtonChat from "./filter-button-chat";
import { ConversationType } from "@/dtype";
import ListChat from "./list-chat";
import getUsers from "@/lib/get-users";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

const SidebarChat = async () => {

  const conversations:ConversationType[] = await getConversations()
  const profiles = await getUsers()
  const currentProfile = await currentUser()
  const profilePhone = currentProfile?.phoneNumbers[0].phoneNumber!
  if(!profilePhone){
    return redirectToSignIn()
  }
  return ( 
    <div className="h-full flex flex-col gap-y-4 bg-zinc-800 border-gray-900 border-r">
      <div className="mt-4 px-4 font-medium flex">
        <p className="text-2xl text-gray-200 flex-1">Chats</p>
        <CreateChatButton
          items={conversations}
          profiles={profiles}
          profilePhone={profilePhone} 
        />
        <FilterButtonChat />
      </div>
      <div className="px-4 flex-1">
        <ListChat
          items={conversations}
          profilePhone={profilePhone}
        />
      </div>
    </div>
   );
}
 
export default SidebarChat;