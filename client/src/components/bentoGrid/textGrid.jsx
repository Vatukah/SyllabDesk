import { ArrowRightIcon } from "@heroicons/react/24/outline"
export default function TextGrid({prop}){

    return(
        <div data-bento-grid={prop.text} className="bg-white rounded-xxl py-4 px-6 min-h-[12.5rem] ">
            <div className="flex flex-col   h-full  justify-evenly  flexbox">
            <div className="text-xxl font-bold text-accent ">{prop.text}</div>
            <div className="bento-btn accent">
           <ArrowRightIcon/>
            </div>
            </div>
        </div>
    )
}


