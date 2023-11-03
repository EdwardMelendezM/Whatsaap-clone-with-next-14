"use client"

import  axios  from "axios"
import { Profile } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import AvatarOtherUser from "./avatar-other-user";

interface UserboxProps{
  data: Profile
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
        router.push(`/chat/${data.data.id}`)
      })
      .finally(()=> setIsLoading(false))
  },[data,router])

  return ( 
    <div className=" w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
      <AvatarOtherUser profile={data} />
      <div className="focus:outline-none">
        <span className="absolute inset-0" aria-placeholder="true"/>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-medium text-gray-200">
            {data.name}
          </p>
        </div>
      </div>
      </div>
   );
}
 
export default UserBox;