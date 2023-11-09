import { ConversationType } from "@/dtype";
import { useMemo } from "react";

const useOtherUser = (conversations: ConversationType, profilePhone: string) => {
  const otherProfile = useMemo(()=>{
    const otherProfile = conversations?.users?.filter((user)=>user.phone !== profilePhone)
    // TODO
    return otherProfile[0]
  }, [conversations, profilePhone])

  return otherProfile
}
 
export default useOtherUser;