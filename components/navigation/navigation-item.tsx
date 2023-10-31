"use client"

import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";
import { GaugeCircleIcon, MessageCircleIcon, PhoneIcon, SettingsIcon,  } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavigationItemProps{
  name: string
  path?: "/chat" | "/call" | "/state" | "/settings" ,
  icon: "chat" | "call" | "state" | "settings",
  onShow?: () => void
}

const iconMap = {
  "chat": MessageCircleIcon,
  "call": PhoneIcon,
  "state": GaugeCircleIcon,
  "settings": SettingsIcon
}

const NavigationItem = ({
  name,
  path,
  icon,
  onShow
}: NavigationItemProps) => {

  const pathname = usePathname()
  const router = useRouter()
  const Icon = iconMap[icon]

  const handleOnClick = () => {
    if(path){
      router.push(path)
    }else{
      onShow && onShow()
    }
  }

  return ( 
    <ActionTooltip label={name} side="bottom" align="center">
      <button
        onClick={() => handleOnClick()}
        className="group relative flex items-center">
        <div className={ cn(
          "absolute left-0 bg-[#25D366] rounded-full transition-all w-[4px]",
          path !== pathname && "group-hover:h-[20px]",
          path === pathname ? "h-[36px]" : "h-[8px]"
        ) }/>
        <div className={cn(
          "relative group flex mx-1 items-center justify-center h-[48px] w-[48px]  group-hover:bg-gray-600 transition-all overflow-hidden rounded-[16px]",
          path !== pathname && "bg-primary/10 text-primary ",
        )}>
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
      </button>
    </ActionTooltip>
   );
}
 
export default NavigationItem;