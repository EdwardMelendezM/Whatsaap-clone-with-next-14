"use client"
import { UserButton } from "@clerk/nextjs";
import NavigationItem from "./navigation-item";
import NavigationSetting from "./navigation-config";

type NavigationRoute = {
  name: string,
  path: "/chat" | "/call" | "/state" | "/settings" ,
  icon: "chat" | "call" | "state" | "settings"
}

const navigationRoutes: Array<NavigationRoute>  = [
  {
    name: "Chats",
    path: "/chat",
    icon: "chat"
  },
  {
    name: "Llamadas",
    path: "/call",
    icon: "call"
  },
  {
    name: "Estados",
    path: "/state",
    icon: "state"
  },
]

const NavegationSidebar = () => {
  return ( 
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3">
      <div className="mt-4 flex-1 w-full">
        {
          navigationRoutes.map((route, index) => (
            <div key={index} className="mb-4">
              <NavigationItem
                name={route.name}
                path={route.path}
                icon={route.icon}
              />
            </div>
          ))
        }
      </div>
      <NavigationSetting />
      <UserButton afterSignOutUrl="/" />
    </div>
   );
}
 
export default NavegationSidebar;