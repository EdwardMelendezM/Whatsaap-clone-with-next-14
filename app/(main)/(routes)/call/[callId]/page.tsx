import {getCurrentUser} from "@/lib/get-current-user";
import {MediaRoom} from "@/components/call/media-room";

interface CallIdPageProps {
    params: {
        callId: string;
    }
}

const CallIdPage = async ({
                              params
                          }: CallIdPageProps) => {
    const currentUser = await getCurrentUser();
    const callId = params.callId;
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <MediaRoom conversationId={callId}
                          currentUser={currentUser}
                          audio={true}
                          video={false}/>
        </div>

    );
}

export default CallIdPage;