
export default function CTA_btn({text,onclick}){

    return(
        <div className="inline-block px-sm py-xxs text-sm rounded-xl accent-light text-primary font-bold  cursor-pointer" onClick={onclick}>  
   {text}
        </div>
    )
}