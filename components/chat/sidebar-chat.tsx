import { currentProfile } from "@/lib/current-user";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import CreateChatButton from "./create-button-chat";
import FilterButtonChat from "./filter-button-chat";
import UserItemChat from "./user-item-chat";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

const SidebarChat = async () => {

  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const conversations = await db.conversation.findMany({
    where: {
      
    }
  })

  return ( 
    <div className="h-full flex flex-col gap-y-4 bg-zinc-800">
      <div className="mt-4 px-4 font-medium flex">
        <p className="text-2xl text-gray-200 flex-1">Chats</p>
        <CreateChatButton />
        <FilterButtonChat />
      </div>
      <div className="px-4 flex-1">
        <Command className="bg-zinc-800">
          <CommandInput placeholder="Buscar" className="text-gray-300" />
          <CommandList className="ml-0 pl-0 mt-1">
            <ScrollArea className="h-[86vh]">
              <CommandEmpty className="text-gray-300 text-md mt-4 px-2 text-center">Sin resultados</CommandEmpty>
              <CommandGroup className="mt-2 ml-0 pl-0" >
                <CommandItem className="aria-selected:bg-transparent py-2">
                  <UserItemChat />
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent py-2">
                  <UserItemChat isMessage isSeen />
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent py-2">
                  <UserItemChat isMessage />
                </CommandItem>
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </div>
    </div>
   );
}
 
export default SidebarChat;