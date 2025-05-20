import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid";
export default function Chapter({name,children}){
    
    const [open,setOpen] = useState(true);

    return(
        <div className={`mb-2 rounded-md  transition-all px-2 `} >
       <div className="flex items-center justify-between gap-4 select-none" onClick={()=>setOpen(!open)}>  <h3 className=" w-full text-left grow-0 font-bold" >{name}</h3> <ChevronDownIcon className={`w-4 h-4 ${open?"rotate-180":"rotate-0"}`}/></div>
        <ul className={` ${open?"h-fit":"h-0"} overflow-hidden cursor-default ml-1  transition-all `}>
        {children}
        </ul>
        </div>
    )
}