import { ConversationType } from "@/dtype";
import { useMemo } from "react";

const useOtherProfile = (conversations: ConversationType, profilePhone: string) => {
  const otherProfile = useMemo(()=>{
    const otherProfile = conversations?.users?.filter((user)=>user.phone !== profilePhone)
    // TODO
    return otherProfile ?? null
  }, [conversations, profilePhone])

  return otherProfile
}
 
export default useOtherProfile;