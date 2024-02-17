import {getCurrentUser} from "@/lib/get-current-user";
import {MediaRoom} from "@/components/call/media-room";

interface CallIdPageProps {
    params: {
        conversationId: string;
    }
}

const CallIdPage = async ({
                              params
                          }: CallIdPageProps) => {
    const currentUser = await getCurrentUser();
    const conversationId = params.conversationId;
    return (
        <>
            <MediaRoom conversationId={conversationId}
                          currentUser={currentUser}
                          audio={true}
                          video={false}/>
        </>

    );
}

export default CallIdPage;