import {Chat} from "@/components/chat/chat";
import {getCurrentUser} from "@/lib/get-current-user";
import getMessages from "@/lib/get-message";

interface MemberIdPageProps {
  params: {
    conversationId: string;
  }
}

const MemberIdPage = async ({
  params
}: MemberIdPageProps) => {
  const currentUser = await getCurrentUser();
  const initialMessages = await getMessages(params.conversationId);
  const conversationId = params.conversationId;
  return (
      <Chat messages={initialMessages}
            currentUser={currentUser}
            conversationId={conversationId} />
  );
}

export default MemberIdPage;