"use client"

import  axios  from "axios"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import AvatarOtherUser from "./avatar-other-user";

interface UserboxProps{
  data: User
}

const UserBox = ({
  data
}: UserboxProps) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(()=>{
    setIsLoading(true)
    axios.post('api/conversations', {profileId: data.id})
      .then((data)=> {
        router.push(`/conversations/${data.data.id}`)
      })
      .finally(()=> setIsLoading(false))
  },[data,router])

  return ( 
    <div
      className=" w-full relative flex items-center space-x-3 bg-zinc-800 p-3 hover:bg-zinc-700 rounded-lg transition cursor-pointer"
      onClick={handleClick}>
      <AvatarOtherUser user={data} />
      <div className="focus:outline-none">
        <span className="absolute inset-0" aria-placeholder="true"/>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-medium text-gray-400">
            {data.name}
          </p>
        </div>
      </div>
      </div>
   );
}
 
export default UserBox;