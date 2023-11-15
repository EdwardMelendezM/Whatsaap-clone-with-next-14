import { Conversation, Message, User } from "@prisma/client";

export type MessageType = Message & {
  sender: User;
  seen: User[]
}

export type ConversationType  = Conversation & {
  users: User[];
  messages: MessageType[]
}


export enum TYPE_CHAT_EVENT  {
  USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT",
  USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT",
  NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT",
  START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT",
  STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT"
}
