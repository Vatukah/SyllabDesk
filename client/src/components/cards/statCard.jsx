export default function StatCard({icon,title,value}){

    return(
        <div className="flex items-center gap-md p-md w-fit min-w-[160px] rounded-md shadow-md border border-[rgba(var(--accent-light),0.5)]">
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