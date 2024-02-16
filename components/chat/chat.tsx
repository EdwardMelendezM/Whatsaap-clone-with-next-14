"use client"

import {User} from "@prisma/client";

import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-message";
import ChatInput from "@/components/chat/chat-input";
import {MessageType} from "@/dtype";

interface ChatProps {
    messages: MessageType[];
    currentUser: User
    conversationId: string
}

export const Chat = ({
                         currentUser,
                         conversationId,
                         messages
                     }: ChatProps) => {
    return (
        <div className="bg-zinc-800 flex flex-col h-full">
            <ChatHeader
                imageUrl={currentUser.imageUrl}
                name={currentUser.name}
                conversationId={conversationId}
                type="conversation"
            />
            <ChatMessages
                initialMessages={messages}
                currentUser={currentUser}
                conversationId={conversationId}
            />
            <ChatInput/>
        </div>
    )
}