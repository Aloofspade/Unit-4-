import { Message , Divider , Icon } from "semantic-ui-react"
import { useRouter } from "next/router"
import Link from "next/link";


export const HeaderMessage = () => {
    const router = useRouter();
    const signupRoute = router.pathname === "/signup";
    return <Message
     icon={signupRoute ? "setting" : "privacy"}
      color="purple" 
      header={signupRoute ? "Get Started Here" : "Welcome Back"}
      content= {signupRoute ? "Create a new account" : "Login with Email and Passsword"}/>
}

export const FooterMessage = () => {
    const router = useRouter();
    const signupRoute = router.pathname === "/signup";

    return (
    <>
    {signupRoute ? (
<>
<Message warning attached="bottom">
<Icon name="help" />
Existing user?  <Link rel="stylesheet" href="/login">Login here instead</Link>    
 </Message>
 <Divider hidden />
 </>
) : (
<>
<Message attached="top" info>
    <Icon name="lock"/>
    <Link href='/reset'>Forget Password?</Link>
</Message>
<Message attached="bottom" warning>
    <Icon name="help"/> New User? <Link href='/signup'> SignUp Here</Link> instead
</Message>
</>
)}
</>
)}
