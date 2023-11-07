"use client"
import { ConversationType } from "@/dtype";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import UserItemChat from "./user-item-chat";
import useConversations from "@/hook/use-conversations";

interface ListChatProps{
  items: ConversationType[]
  profilePhone: string 
}

const ListChat = ({
  items,
  profilePhone
}: ListChatProps) => {

  const { conversationId } = useConversations()


  return ( 
    <div> 
      <Command className="bg-zinc-800">
        <CommandInput placeholder="Buscar" className="text-gray-300" />
        <CommandList className="ml-0 pl-0 mt-1">
          <ScrollArea className="h-[86vh]">
            <CommandEmpty className="text-gray-300 text-md mt-4 px-2 text-center">Sin resultados</CommandEmpty>
            <CommandGroup className="mt-2 ml-0 pl-0" >
              {
                items.map((item) => (
                  <CommandItem className="bg-zinc-800" key={item.id}>
                    <UserItemChat
                      data={item}
                      selected={conversationId === item.id}
                      profilePhone={profilePhone}
                    />
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </Command>
    </div>
   );
}
 
export default ListChat;