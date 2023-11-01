import initialProfile from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupPage = () => {

  const profile = initialProfile()
  if(!profile){
    return redirectToSignIn()
  }
  return redirect("/chat")
}
 
export default SetupPage;