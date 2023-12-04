'use client'

import {MessageType} from "@/dtype"
import {cn} from "@/lib/utils"
import {useSession} from "@clerk/nextjs"
import {useRef, useState} from "react"
import {format} from "date-fns"

import {ArrowLeftSquare, CheckCheckIcon, CopyIcon,} from "lucide-react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

interface ChatInputBoxProps{
  data: MessageType
  isLast?: boolean
}

const ChatItemBox = ({
  data,
  isLast
}: ChatInputBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const popoverRef = useRef(null);
  
  const isOwn = session?.session?.user?.phoneNumbers[0].phoneNumber === data.sender?.phone

  const seenList = (data.seen || [])
    .filter((user)=> user.phone !== data?.sender?.phone)
    .map(user=>user.name)
    .join(', ')

  const container = cn("flex gap-3 px-4 py-1", isOwn && 'justify-end')
  const avatar = cn(isOwn && "order-2")
  const body = cn("flex gap-2 bg-zinc-700 rounded-lg pr-14 relative max-w-[400px]", isOwn && "items-end bg-emerald-900 ")

  const message = cn("text-sm w-fit",
    isOwn ? 'text-gray-300': 'text-gray-300',
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );


  const copyText = (text: string | undefined | null ) => {
    if(!text) return
    navigator.clipboard.writeText(text)
    popoverRef.current?.onCloseAutoFocus()
  };


  return ( 
    // <div className={container}>
    //   <div className={avatar}>
    //     <AvatarOtherUser user={data.sender} />
    //   </div>
    //   <div className={body}>
    //     <div className="flex items-center gap-1">
    //       <div className="text-sm text-zinc-300">
    //         {data.sender.name}
    //       </div>
    //       <div className="text-xs text-gray-200">
    //         {format(new Date(data.createdAt), 'p')}
    //       </div>
    //     </div>
    //     <div className={message}>
    //       {data.body}
    //       {
    //         isLast && isOwn && seenList.length > 0 && (
    //           <div className="text-sx font-light text-gray-400">
    //             {`Visto by ${seenList}`}
    //           </div>
    //         )
    //       }
    //     </div>
    //   </div>
    // </div>

      <div className={container}>
        <div className={body}>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <div className={message}>
                  {data.body}
                  {
                      isLast && isOwn && seenList.length > 0 && (
                          <div className="text-xs font-light text-gray-400">
                            {`Visto by ${seenList}`}
                          </div>
                      )
                  }
                </div>
                <div className="absolute text-xs text-gray-400 bottom-1 right-2 flex gap-x-1">
                  {format(new Date(data.createdAt), 'HH:mm')}
                  {
                      isOwn && (
                          <CheckCheckIcon
                              className={cn(
                                  "w-3 h-3",
                                  isLast && isOwn && seenList.length > 0  ? "text-blue-500" : "text-gray-400"
                              )}
                          />
                      )
                  }
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent ref={popoverRef} className="w-[280px] bg-zinc-800/90 border-none shadow-lg" align="center">
              <div className="flex flex-col py-2">
                <Separator className="mb-2 border-gray-600 border-b-2" />
                <Button variant="ghost" className="hover:bg-zinc-700 flex items-center justify-start">
                  <ArrowLeftSquare className="w-5 h-5 text-gray-300" />
                  <p className="text-zinc-300 text-start ml-2">
                    Responder
                  </p>
                </Button>
                <Button variant="ghost"
                        onClick={()=>copyText(data?.body)}
                        className="hover:bg-zinc-700 flex items-center justify-start">
                  <CopyIcon className="w-5 h-5 text-gray-300" />
                  <p className="text-zinc-300 text-start ml-2">
                    Copiar
                  </p>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
   );
}
 
export default ChatItemBox;