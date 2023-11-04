import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Laptop, Settings, UserIcon,  } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const NavigationSetting = () => {
  return ( 
    <Popover>
      <PopoverTrigger asChild>
        <button
          title="Configuracion"
          className="group relative flex items-center">
          <div className={cn(
            "absolute left-0 bg-[#25D366] rounded-full transition-all w-[4px]",
          )} />
          <div className={cn(
            "relative group flex mx-1 items-center justify-center h-[48px] w-[48px]  group-hover:bg-gray-600 transition-all overflow-hidden rounded-[16px]",
          )}>
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[500px] bg-[#2e2e2f] border-none shadow-lg p-0"
        align="start"
        side="top"
      >
        <div className="flex flex-col gap-y-2">
          <Tabs defaultValue="general">
            <div className="flex">
              <div className="flex flex-col h-[400px] mt-2 px-1 py-4">
                <TabsList className="flex flex-col gap-y-2 bg-[#2e2e2f] items-start text-gray-200">
                  <TabsTrigger
                    className="w-[140px] flex justify-start"
                    value="general">
                    <Laptop className="w-5 h-5 text-gray-300" />
                    <p className="ml-3">General</p>
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-[140px] flex justify-start"
                    value="me">
                    <UserIcon className="w-5 h-5 text-gray-300" />
                    <p className="ml-3">Yo</p>
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1 bg-[#303030] border-zinc-800 border-2 border-t-0 border-r-0 border-b-0 p-4 px-6">
                <TabsContent value="general">
                  <p className="text-xl text-gray-200">
                    General
                  </p>
                  <p className="mt-4 text-lg font-light text-gray-300">
                    Inicio de sesion
                  </p>
                  <p className="text-xs text-gray-400">
                    Fecha de creacion: 12/12/2021
                  </p>
                </TabsContent>
                <TabsContent value="me">
                  Change your password here
                </TabsContent>
              </div>
            </div>
          </Tabs>
          
        </div>
      </PopoverContent>
    </Popover>
   );
}
 
export default NavigationSetting;