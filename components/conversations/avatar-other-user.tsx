import { Users2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Profile } from "@prisma/client";

interface AvatarOtherUserProps{
  profile?: Profile
}

const AvatarOtherUser = ({
  profile
}: AvatarOtherUserProps) => {
  return ( 
    <Avatar>
      {/* // todo */}
      <AvatarImage src={profile?.imageUrl || "" } />
      <AvatarFallback>
        <Users2 className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
   );
}
 
export default AvatarOtherUser;