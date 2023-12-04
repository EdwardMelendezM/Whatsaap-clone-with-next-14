"use client"
import { Filter, LucideMessageCircle, User2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
const FilterButtonChat = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="hover:bg-zinc-700 rounded">
          <Filter className="w-4 h-4 text-gray-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] bg-zinc-800 border-none shadow-lg" align="start">
        <div className="flex flex-col py-2">
          <p className="text-start text-md text-zinc-400 mb-2">
            Filtrar chats por
          </p>
          <Button variant="ghost" className="hover:bg-zinc-700 flex items-center justify-start">
            <LucideMessageCircle className="w-5 h-5 text-gray-300" />
            <p className="text-zinc-300 text-start ml-2">
              Mensaje no leidos
            </p>
          </Button>
          <Button variant="ghost" className="hover:bg-zinc-700 flex items-center justify-start">
            <User2Icon className="w-5 h-5 text-gray-300" />
            <p className="text-zinc-300 text-start ml-2">
              Contactos
            </p>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default FilterButtonChat;