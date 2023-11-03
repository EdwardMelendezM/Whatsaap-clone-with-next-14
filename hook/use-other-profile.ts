import { ConversationType } from "@/dtype";
import { useMemo } from "react";

const useOtherProfile = (conversations: ConversationType, profilePhone: string) => {
  const otherProfile = useMemo(()=>{
    const otherProfile = conversations.profiles.filter((profile)=>profile.phone !== profilePhone)

    return otherProfile[0]
  }, [conversations, profilePhone])

  return otherProfile
}
 
export default useOtherProfile;