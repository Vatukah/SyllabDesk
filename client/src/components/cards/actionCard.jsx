import PrimaryBtn from "../buttons/primaryBtn";

export default function ActionCard({title,para,actionText,action,icon,textAlign='left'}){
    
   const alignTo=(align)=>{
    switch(align.toLowerCase()){
        case "right" : return "text-right";
        case "center" : return "text-center";
        case "justify" : return "text-justify";
        default : return "text-left";
    }
   }

    return(
        <div className={`primary-bg-dark w-full px-xs py-sm rounded-md flex flex-col justify-center items-center ${alignTo(textAlign)}`}>
          <div className="text-accent mt-xs p-xs rounded-full primary-bg">{icon}</div>
          <div className="max-w-100 m-xs">
            <h3 className="font-semibold text-accent mb-xs">{title}</h3>
            <p className="text-sm" >{para}</p>
        </div>
        <PrimaryBtn value={actionText} action={action}/>
        </div>
    )
}