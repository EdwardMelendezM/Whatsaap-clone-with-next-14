import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-message";

interface MemberIdPageProps {
  params: {
    memberId: string;
  }
}

const MemberIdPage = async ({
  params
}: MemberIdPageProps) => {

  const welcome = `Bienvenido de nuevo, ${params.memberId}`

  return ( 
    <div className="bg-zinc-800 flex flex-col h-full">
      <ChatHeader
        imageUrl={''}
        name={'Juan'}
        serverId={params.memberId}
        type="conversation"
      />
      <ChatMessages
      />
    </div>
   );
}
 
export default MemberIdPage;