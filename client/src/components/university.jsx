
import hnbgu from "../assets/HNBG-logo.png"
export default function University({image,name}){

    return(
        <div className="w-[11.25rem] h-[12.5rem]  flex flex-col justify-between items-center py-sm rounded-xl  university">
            <img src={hnbgu} alt="hnbgu" className="w-[71%] aspect-square" />
        <p className="font-semibold">{name}</p>
        </div>
    )
}