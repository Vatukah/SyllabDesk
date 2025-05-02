

export default function NavItem({icon,text}){
     return(
        <div className={`flex items-center gap-md px-2 py-xxs grow-0 shrink-0 navItem  rounded-md`}>
            <div className="w-[24px] text-accent-light grow-0 shrink-0 primary-bg rounded-full p-1">{icon}</div>
            <div className={`overflow-hidden w-full grow-0 shrink-0 transition-[width] whitespace-nowrap`} >{text}</div>
        </div>
     )
}