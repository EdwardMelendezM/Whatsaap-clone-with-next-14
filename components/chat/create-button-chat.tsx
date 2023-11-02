"use client"
import { Edit } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import UserItemChat from "./user-item-chat";
const CreateChatButton = () => {
  return ( 
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="hover:bg-zinc-700 rounded">
          <Edit className="w-4 h-4 text-gray-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] bg-zinc-800/90 border-none shadow-lg" align="start">
        <div className="flex flex-col gap-y-2 px-3 py-2">
          <p className="text-2xl text-gray-100 font-medium">
            Nuevo Chat
          </p>
          <Command className="bg-zinc-800">
            <CommandInput placeholder="Buscar" className="text-gray-300 border-b-green-400" />
            <CommandList>
              <CommandEmpty className="text-gray-300 text-md mt-4 px-2 text-center">No hay resultados encontrados</CommandEmpty>
              <CommandGroup >
                <CommandItem className="aria-selected:bg-transparent py-2">
                  <UserItemChat />
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent py-2">
                  <UserItemChat />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
   );
}
 
export default CreateChatButton;