'use client'
import {ElementRef, Fragment, useEffect, useRef, useState} from "react";
import {ArrowDown} from "lucide-react";

import {User} from "@prisma/client";
import {MessageType} from "@/dtype";

import {Button} from "@/components/ui/button";
import ChatItemBox from "@/components/chat/chat-item-box";
import {useSocket} from "@/components/providers/socket-provider";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useChatScroll} from "@/hook/use-chat-scroll";

interface ChatMessageProps {
    initialMessages: MessageType[];
    conversationId: string
    currentUser: User
}

const ChatMessages = ({
                          initialMessages,
                          conversationId,
                          currentUser
                      }: ChatMessageProps) => {
    const [messages, setMessages] = useState(initialMessages);
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    useChatScroll({
        chatRef,
        bottomRef,
    });
    const distanceFromBottom = false;

    const [messagesData, setMessagesData] = useState(messages)
    const [isMounted, setIsMounted] = useState(false)

    const { socket } = useSocket()

    const addMessageKey = `chat:${conversationId}:message:update`
    const updateKey = `chat:${conversationId}:message:update`

    useEffect(() => {
        if(!isMounted) {
            setIsMounted(true)
        }
    }, [isMounted]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        if(!isMounted){
            return
        }
        if (!socket) {
            return;
        }
        socket.on(addMessageKey, (message:any) => {
            setMessagesData((messagesData) => [...messagesData, message])
            timeoutId = setTimeout(()=>{
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth"
                })
            }, 200)
        })
        socket.on(updateKey, (message: any) => {
          setMessages((messages) =>
            messages.map((msg) => {
              if (msg.id === message.id) {
                return message;
              }
              return msg;
            })
          );
        });

        return () => {
            socket.off(addMessageKey)
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }

    }, [addMessageKey, isMounted, conversationId, socket]);

    return (
        <ScrollArea className="relative" ref={chatRef}>
            <div>
                {messagesData.map((message, i) => (
                    <Fragment key={message.id}>
                        <ChatItemBox isLast={i === messages.length - 1}
                                     data={message}
                                     key={message.id} />
                    </Fragment>
                ))}
                { distanceFromBottom && (
                    <Button className="absolute bottom-12 right-4 bg-zinc-700 px-2"
                            onClick={()=>{}}
                    >
                        <ArrowDown className="w-6 h-6 text-gray-200" />
                    </Button>
                )}
            </div>
            <div ref={bottomRef} />
        </ScrollArea>
    );
};

export default ChatMessages;
