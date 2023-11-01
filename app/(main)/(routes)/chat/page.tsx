import { UserButton } from "@clerk/nextjs";

const MemberIdPage = () => {
  return ( 
    <div className="bg-[#313338] flex flex-col items-center justify-center h-full gap-y-5">
      <p className="text-4xl text-center text-white font-medium">
        WhatsApp para Windows
      </p>
     <div>
        <p className="text-sm text-center text-gray-400">
          Envia y recibe mensajes sin mantener tu telefono conectado.
        </p>
        <p className="text-sm text-center text-gray-400">
          Usa Whatsaap en hasta 4 dispositivos vinculados y 1 telefono a la vez
        </p>
     </div>
      <UserButton afterSignOutUrl="/" />
    </div>
   );
}
 
export default MemberIdPage;