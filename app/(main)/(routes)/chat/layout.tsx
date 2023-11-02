import SidebarChat from "@/components/chat/sidebar-chat";

const LayoutConversations = ({
  children
}: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full">
      <div className="hidden md:flex h-full w-[300px] z-30 flex-col fixed inset-y-0">
        <SidebarChat />
      </div>
      <div className="md:pl-[300px] h-full">
        {children}
      </div>
    </div>
   );
}
 
export default LayoutConversations;