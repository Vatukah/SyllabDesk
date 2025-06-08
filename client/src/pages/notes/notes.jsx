import { useState } from "react"
import Loader from "../../components/loader/loader";

export default function Notes(){
   const [loading,setLoading] = useState(true);

   if(loading) return <div className="w-full h-screen"><Loader text={"loading notes"}/></div>
    return(<div>Notes</div>)
}