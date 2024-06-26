"use client"
import { Edit } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ConversationType } from "@/dtype";
import { User } from "@prisma/client";
import useConversations from "@/hook/use-conversations";
import UserBox from "./user-box";

interface CreateChatProps {
  items: ConversationType[]
  users: User[]
}


const CreateChatButton = ({
  items,
  users
}: CreateChatProps) => {

  const { conversationId } = useConversations()


  return ( 
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="hover:bg-zinc-700 rounded">
          <Edit className="w-4 h-4 text-gray-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] bg-zinc-800 border-none shadow-lg" align="start">
        <div className="flex flex-col gap-y-2 px-3 py-2">
          <p className="text-xl text-gray-100 font-medium">
            Nuevo Chat
          </p>
          <Command className="bg-zinc-800">
            <CommandInput placeholder="Buscar" className="text-gray-300 border-b-green-400 text-sm" />
            <CommandList>
              <CommandEmpty className="text-gray-300 text-md mt-4 px-2 text-center text-sm">
                No hay resultados encontrados
              </CommandEmpty>
              {/* <CommandGroup title="Frecuentes" >
                {
                  items.map((item) => (
                    <CommandItem key={item.id}>
                      <UserItemChat
                        data={item}
                        selected={conversationId === item.id}
                      />
                    </CommandItem>
                  ))
                }
              </CommandGroup> */}
              <CommandGroup title="Todos los contactos">
                {
                  users.map((item) => (
                    <CommandItem key={item.id}>
                      <UserBox
                        data={item}
                      />
                    </CommandItem>
                  ))
                
                }
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
   );
}
 
export default CreateChatButton;