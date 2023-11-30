"use client"
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-message";
import ChatInput from "@/components/chat/chat-input";
import {MessageType, TYPE_CHAT_EVENT} from "@/dtype";
import {User} from "@prisma/client";
import {useEffect, useState} from "react";
import {useSocket} from "@/components/providers/socket-provider";

interface ChatProps {
    messages:MessageType[];
    currentUser: User
    conversationId: string
}
export const Chat = ({
                         currentUser,
                         conversationId,
                         messages
                     }: ChatProps) => {
    const [messagesData, setMessagesData] = useState(messages)
    const [isMounted, setIsMounted] = useState(false)
    const { socket } = useSocket()

    const addMessageKey = `chat:${conversationId}:message:update`

    useEffect(() => {
        if(!isMounted) {
            setIsMounted(true)
        }
    }, [isMounted]);

    useEffect(() => {
        if(!isMounted){
            return
        }
        if (!socket) {
            return;
        }
        socket.on(addMessageKey, (message:any) => {
            console.log('message', message)
            setMessagesData((messagesData) => [...messagesData, message])
        })
        return () => {
            socket.off(addMessageKey)
        }

    }, [isMounted, conversationId, socket]);


    useEffect(() => {


    }, []);

    return (
        <div className="bg-zinc-800 flex flex-col h-full">
            <ChatHeader
                imageUrl={''}
                name={'Juan'}
                conversationId={conversationId}
                type="conversation"
            />
            <ChatMessages
                initialMessages={messagesData}
                currentUser={currentUser}
            />
            <ChatInput />
        </div>
    )
}