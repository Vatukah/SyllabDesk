import { useAuth } from "../contexts/providers/authProvider"

export default function WelcomeMessage(){
    const {user} = useAuth();
    return (
        <>
        <h2 className="font-bold  text-xl md:text-2xl  tracking-wider">Welcome Back, <span className=" text-accent">{user?.user_metadata?.username}</span> 👋</h2>
        {/* <p className="text-lg text-center"> {user?.user_metadata?.username}</p></> */}
        
        </>
    )
}