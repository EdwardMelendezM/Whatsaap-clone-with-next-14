import initialUser from "@/lib/initial-user";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = () => {

  const profile = initialUser()
  if(!profile){
    return redirectToSignIn()
  }
  return redirect("/chat")
}
 
export default SetupPage;