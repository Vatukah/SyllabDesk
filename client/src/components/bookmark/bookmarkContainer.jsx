import Bookmark from "./bookmark";

export default function BookMarkCont(){

    return (
        <div className=" my-sm p-sm pl-xl min-h-[4rem] bookmarkCont flex items-center gap-xs overflow-hidden overflow-x-auto my-scroll-bar">
          {false?[1,2,3,4,5,6,7,8].map((b)=><Bookmark name={"C# variables"} link={"#"} key={b}/>):<div className="text-center font-bold text-gray-400 mx-auto">Oops! No study shortcuts saved. Bookmark your brain boosters!</div>}
        </div>
    )
}