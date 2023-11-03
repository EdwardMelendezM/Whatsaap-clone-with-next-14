import { Conversation, Message, Profile } from "@prisma/client";

export type MessageType = Message & {
  sender: Profile;
  seen: Profile[]
}

export type ConversationType  = Conversation & {
  profiles: Profile[];
  messages: MessageType[]
}