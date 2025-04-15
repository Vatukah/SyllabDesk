
export default function CTA_btn({text,onclick}){

    return(
        <div className="inline-block px-sm py-xxs text-sm rounded-xl accent-light text-primary font-bold mr-xs cursor-pointer" onClick={onclick}>  
   {text}
        </div>
    )
}