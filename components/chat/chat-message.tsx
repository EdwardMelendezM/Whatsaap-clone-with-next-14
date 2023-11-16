'use client'

import {io} from "socket.io-client"

import { MessageType } from "@/dtype";
import useConversations from "@/hook/use-conversations";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import ChatItemBox from "./chat-item-box";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatScroll } from "@/hook/use-chat-scroll";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
    initialMessages: MessageType[];
}

const ChatMessages = ({
                          initialMessages,
                      }: ChatMessageProps) => {
    const [messages, setMessages] = useState(initialMessages);
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const socketRef = useRef<any>();

    const { conversationId } = useConversations();
    const { onAutoScroll, distanceFromBottom } = useChatScroll({
        chatRef,
        bottomRef,
    });

    useEffect(() => {
        fetch("/api/socket-io")
            .finally(()=>{
                socketRef.current = io({
                    query: {
                        roomId: "name",
                        user: "name",
                        picture: "user.picture"
                    }
                })

                socketRef.current.on("connect", () => {
                    console.log(socketRef.current.id)
                })
            })
    }, []);

    return (
        <ScrollArea className="relative" ref={chatRef}>
            <div className="flex-1 overflow-y-auto flex flex-col mt-3 mb-5">
                {messages.map((message, i) => (
                    <Fragment key={message.id}>
                        <ChatItemBox isLast={i === messages.length - 1} data={message} key={message.id} />
                    </Fragment>
                ))}
                { distanceFromBottom && (
                    <Button
                        className="absolute bottom-12 right-4 bg-zinc-700 px-2"
                        onClick={onAutoScroll}
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
