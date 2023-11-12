"use client"

import {MessageType} from "@/dtype";
import useConversations from "@/hook/use-conversations";
import {ElementRef, Fragment, useEffect, useRef, useState} from "react";
import ChatItemBox from "./chat-item-box";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useChatScroll} from "@/hook/use-chat-scroll";

interface ChatMessageProps {
  initialMessages: MessageType[];
}

const ChatMessages = ({
  initialMessages
}: ChatMessageProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const { conversationId } = useConversations();
  useChatScroll({
      chatRef,
      bottomRef
  });

  return (
      <ScrollArea ref={chatRef}>
        <div className="flex-1 overflow-y-auto flex flex-col mt-3 mb-5">
          {
            messages.map((message,i)=> (
                <Fragment key={message.id} >
                    <ChatItemBox
                        isLast={i === messages.length - 1}
                        data={message}
                        key={message.id}
                    />
                </Fragment>
            ))
          }
        </div>
          <div ref={bottomRef}/>
      </ScrollArea>

   );
}
 
export default ChatMessages;