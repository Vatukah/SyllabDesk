
export default function OnlyIcon({toolTip,action,icon,className}){
     return (
        <button className={`p-xxs hover:primary-bg-dark cursor-pointer rounded-md ${className}`} onClick={action} title={toolTip} >
            {icon}
        </button>
     )
}