import { Conversation, Message, User } from "@prisma/client";

export type MessageType = Message & {
  sender: User;
  seen: User[]
}

export type ConversationType  = Conversation & {
  users: User[];
  messages: MessageType[]
}

export const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT"
export const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT"
export const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT"
export const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT"
export const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT"
