'use client'

import {io} from "socket.io-client"

import {MessageType, TYPE_CHAT_EVENT} from "@/dtype";
import useConversations from "@/hook/use-conversations";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import ChatItemBox from "./chat-item-box";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatScroll } from "@/hook/use-chat-scroll";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {User} from "@prisma/client";

interface ChatMessageProps {
    initialMessages: MessageType[];
    currentUser: User
}

const ChatMessages = ({
                          initialMessages,
                          currentUser
                      }: ChatMessageProps) => {
    const [messages, setMessages] = useState(initialMessages);
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const { onAutoScroll, distanceFromBottom } = useChatScroll({
        chatRef,
        bottomRef,
    });

    return (
        <ScrollArea className="relative" ref={chatRef}>
            <div className="flex-1 overflow-y-auto flex flex-col mt-3 mb-5">
                {messages.map((message, i) => (
                    <Fragment key={message.id}>
                        <ChatItemBox isLast={i === messages.length - 1}
                                     data={message}
                                     key={message.id} />
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
