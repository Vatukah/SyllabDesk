import { useAuth } from "../contexts/providers/authProvider"

export default function WelcomeMessage(){
    const {user} = useAuth();
    return (
        <>
        <h2 className="font-bold text-accent text-[3rem] abrilFont tracking-wider">Welcome ,</h2>
        <p className="text-lg text-center"> {user?.user_metadata?.username}</p></>
    )
}