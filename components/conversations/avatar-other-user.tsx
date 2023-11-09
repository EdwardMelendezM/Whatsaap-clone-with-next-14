import { Users2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";

interface AvatarOtherUserProps{
  user?: User
}

const AvatarOtherUser = ({
  user
}: AvatarOtherUserProps) => {
  return ( 
    <Avatar>
      {/* // todo */}
      <AvatarImage src={user?.imageUrl || "" } />
      <AvatarFallback>
        <Users2 className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
   );
}
 
export default AvatarOtherUser;