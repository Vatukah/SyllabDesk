

export default function NavItem({icon,text,isExpand}){
     return(
        <div className={`flex items-center gap-md px-2 py-xxs grow-0 shrink-0 navItem`}>
            <div className="w-[24px] text-accent-light grow-0 shrink-0">{icon}</div>
            <div className={`overflow-hidden ${isExpand ?'w-full':'w-0'} grow-0 shrink-0 transition-[width] whitespace-nowrap`} >{text}</div>
        </div>
     )
}