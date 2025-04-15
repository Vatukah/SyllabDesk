export default function CTA_btn_light({text,onclick}){

    return(
        <div className="inline-block px-sm py-xxs text-sm rounded-xl accent-light-dim text-accent-light font-bold mr-xs cursor-pointer" onClick={onclick}>  
   {text}
        </div>
    )
}