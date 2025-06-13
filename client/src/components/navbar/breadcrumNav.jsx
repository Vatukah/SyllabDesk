import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";

 export default function Breadcrum(){

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x)=> x);
   
    const suffix = "/" + pathnames.shift() + "/";

const formatSegment = (segment)=>{
    return segment.slice(0,1).toUpperCase() + segment.slice(1).replaceAll('-'," ");
}

    return (
        <nav className="my-xs">
            {pathnames.map((segment,index)=> {
                const routeTo = `${ suffix + pathnames.slice(0,index+1).join('/')}`;
                const isLast = index === pathnames.length - 1
                return (
                    <span key={routeTo}>
                          <ChevronRightIcon className="w-md inline-block text-gray-400 "/> 
                        {isLast?<span className="text-accent font-semibold text-sm">{formatSegment(segment)}</span>:<Link to={routeTo} className="hover:underline text-sm text-gray-400" >{formatSegment(segment)}</Link>}
                    </span>
                )
                })}
        </nav>
    )
 }
