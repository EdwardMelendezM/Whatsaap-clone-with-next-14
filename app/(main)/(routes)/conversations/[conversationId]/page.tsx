import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-message";
import getConversationById from "@/lib/get-conversations-by-id";
import getMessages from "@/lib/get-message";

interface MemberIdPageProps {
  params: {
    conversationId: string;
  }
}

const MemberIdPage = async ({
  params
}: MemberIdPageProps) => {

  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  return ( 
    <div className="bg-zinc-800 flex flex-col h-full">
      <ChatHeader
        imageUrl={''}
        name={'Juan'}
        serverId={params.conversationId}
        type="conversation"
      />
      <ChatMessages
        initialMessages={messages}
      />
      <ChatInput/>

    </div>
   );
}
 
export default MemberIdPage;