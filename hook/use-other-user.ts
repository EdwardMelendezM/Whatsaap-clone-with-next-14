import { ConversationType } from "@/dtype";

const useOtherUser = (conversations: ConversationType, profilePhone: string) => {

    const otherUsers = conversations?.users?.filter((user) => user.phone !== profilePhone);
    return otherUsers[0];

};

export default useOtherUser;