

export default function NavItem({icon,text,action}){
     return(
        <div className={`flex items-center gap-md px-2 py-xxs grow-0 shrink-0 navItem  rounded-md`} onClick={action}>
            <div className="w-[24px]  grow-0 shrink-0 text-black rounded-full p-1">{icon}</div>
            <div className={`overflow-hidden w-full grow-0 shrink-0 transition-[width] whitespace-nowrap text-white`} >{text}</div>
        </div>
     )
}