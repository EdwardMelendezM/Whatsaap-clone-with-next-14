"use client"
import { ConversationType } from "@/dtype";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import UserItemChat from "./user-item-chat";
import useConversations from "@/hook/use-conversations";

interface ListChatProps{
  items: ConversationType[]
}

const ListChat = ({
  items,
}: ListChatProps) => {

  const { conversationId } = useConversations()


  return ( 
    <div> 
      <Command className="bg-zinc-800">
        <CommandInput placeholder="Buscar" className="text-gray-300 bg-transparent" />
        <CommandList className="ml-0 pl-0 mt-1 bg-transparent">
          <ScrollArea className="h-[86vh] bg-transparent">
            <CommandEmpty className="text-gray-300 text-md mt-4 px-2 text-center bg-transparent">
              Sin resultados
            </CommandEmpty>
            <CommandGroup className="mt-2 ml-0 pl-0 bg-transparent" >
              {
                items.map((item) => (
                  <CommandItem className="bg-transparent" key={item.id}>
                    <UserItemChat
                      data={item}
                      selected={conversationId === item.id}
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