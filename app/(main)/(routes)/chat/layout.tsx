import SidebarChat from "@/components/conversations/sidebar-chat";

const LayoutConversations = async ({
  children
}: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full">
      <div className="hidden md:flex h-full w-[300px] z-29 flex-col fixed inset-y-0">
        <SidebarChat />
      </div>
      <div className="md:pl-[300px] h-full">
        {children}
      </div>
    </div>
   );
}
 
export default LayoutConversations;