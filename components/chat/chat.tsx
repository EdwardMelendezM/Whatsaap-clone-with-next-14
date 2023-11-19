"use client"
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-message";
import ChatInput from "@/components/chat/chat-input";
import {MessageType, TYPE_CHAT_EVENT} from "@/dtype";
import {User} from "@prisma/client";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";

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
    const [isMounted, setIsMounted] = useState(false)
    const socketRef = useRef<any>();


    useEffect(() => {
        if(!isMounted) {
            setIsMounted(true)
        }
    }, [isMounted]);

    useEffect(() => {
        if(!isMounted){
            return
        }
        fetch("/api/socket-io")
            .finally(()=>{
                socketRef.current = io({
                    query: {
                        conversationId
                    }
                })
                socketRef.current.on("connect", () => {
                    console.log(socketRef.current.id)
                })
                socketRef.current.on(TYPE_CHAT_EVENT.NEW_CHAT_MESSAGE_EVENT, (message: any) => {
                    console.log("El mensaje es", message)
                })
            })
        return () => { socketRef.current.disconnect() }
    }, [isMounted, conversationId]);


    const onSendMessage = (messageBody: string) => {
        if(!socketRef.current) return
        socketRef.current.emit(TYPE_CHAT_EVENT.NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
        })
    }

    return (
        <div className="bg-zinc-800 flex flex-col h-full">
            <ChatHeader
                imageUrl={''}
                name={'Juan'}
                conversationId={conversationId}
                type="conversation"
            />
            <ChatMessages
                initialMessages={messages}
                currentUser={currentUser}
            />
            <ChatInput onSendMessage={onSendMessage} />
        </div>
    )
}