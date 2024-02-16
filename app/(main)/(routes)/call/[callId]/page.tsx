import {getCurrentUser} from "@/lib/get-current-user";

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
            Hello, {currentUser.name}!
        </>

    );
}

export default CallIdPage;