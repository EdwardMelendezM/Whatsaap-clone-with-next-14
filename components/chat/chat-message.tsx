"use client"

import { MessageType } from "@/dtype";
import useConversations from "@/hook/use-conversations";
import { useEffect, useRef, useState } from "react";
import ChatItemBox from "./chat-item-box";

interface ChatMessageProps {
  initialMessages: MessageType[];
}

const ChatMessages = ({
  initialMessages
}: ChatMessageProps) => {
  
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversations()

  useEffect(()=>{
    bottomRef?.current?.scrollIntoView()
  },[conversationId])

  return (
    <div className="flex-1 overflow-y-auto">  
      {
        messages.map((message,i)=> (
          <ChatItemBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))
      }
    </div>
   );
}
 
export default ChatMessages;