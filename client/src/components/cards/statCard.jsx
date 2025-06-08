import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function StatCard({icon,title,value,isEditable,editAction}){

    return(
        <div className="relative flex items-center gap-md p-md w-fit min-w-[160px] rounded-md shadow-md border border-[rgba(var(--accent-light),0.5)] overflow-hidden group">
        {isEditable && <Edit action={editAction}/>}
        <div className="rounded-full  p-2 primary-bg-dark text-accent grow-0 shrink-0">
            {icon}
        </div>
        <div className="grow-0 shrink-0">
            <div className="text-sm">{title}</div>
            {value?<p className="text-lg font-bold text-accent">{value}</p>:<p className="text-gray-400">no data available</p>}
        </div>
        </div>
    )
}

const Edit = ({action})=>{
    return(
        <div className="absolute right-xxs top-xxs opacity-0 group-has-hover:opacity-100 transition-opacity hover:bg-red-200 p-xxs rounded-md cursor-pointer" onClick={action}>
            <PencilSquareIcon className="w-5 font-semibold "/>
        </div>
    )
}