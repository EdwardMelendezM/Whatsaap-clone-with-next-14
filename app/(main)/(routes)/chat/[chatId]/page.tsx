import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-message";
import getConversationById from "@/lib/get-conversations-by-id";
import getMessages from "@/lib/get-message";

interface MemberIdPageProps {
  params: {
    chatId: string;
  }
}

const MemberIdPage = async ({
  params
}: MemberIdPageProps) => {

  const conversation = await getConversationById(params.chatId)
  const messages = await getMessages(params.chatId)

  return ( 
    <div className="bg-zinc-800 flex flex-col h-full">
      <ChatHeader
        imageUrl={''}
        name={'Juan'}
        serverId={params.chatId}
        type="conversation"
      />
      <ChatMessages
        initialMessages={messages}
      />

    </div>
   );
}
 
export default MemberIdPage;