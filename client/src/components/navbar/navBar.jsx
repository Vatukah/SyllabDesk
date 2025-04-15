import { useEffect, useRef, useState } from "react";
import { data, NavLink } from "react-router";
import {
  HomeIcon,
  Squares2X2Icon,
  BookOpenIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
 Bars3Icon
} from "@heroicons/react/24/outline";

import NavItem from "./navItem";
import '../component.css';

export default function Navbar() {
  const [isExpand, setIsExpand] = useState(true);
  const navRef = useRef(null)

  const navigationLinks = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Squares2X2Icon />,
    },
    {
      name: "Syllabus",
      path: "/syllabus",
      icon: <BookOpenIcon />,
    },
    {
      name: "Notes",
      path: "/path",
      icon: <DocumentTextIcon />,
    },
  ];

  const utility = [
    {
      name: "Settings",
      path: "/settings",
      icon: <Cog6ToothIcon />,
    },
    {
      name: "Log Out",
      path: "/logout",
      icon: <ArrowRightStartOnRectangleIcon />,
    },
  ];
  const handleHover=()=>{
    setIsExpand(true);
  }
  const handleHoverLeave=()=>{
    setIsExpand(false);
  }


  return (
    <nav className={`h-full ${isExpand?'w-[14rem]':'w-[3.65rem]'} px-2  pt-md  transition-[width] text `} data-expanded={isExpand} >
      {/* content navigation */}
      <Bars3Icon className={`w-md ${isExpand?'ml-auto':'mx-auto'} cursor-pointer `} onClick={()=>setIsExpand(!isExpand)} title={isExpand?"Close Menu":"Expand Menu"}/>
     <div className="flex justify-between flex-col gap-sm h-full py-xl ">
      <div className="flex flex-col gap-xxs"> 
        
        {navigationLinks.map((link, index) => (
          <NavLink to={link.path} key={index} className="navHover" data-content={link.name} >
           
            <NavItem icon={link.icon} text={link.name} key={index} isExpand={isExpand}/>
          </NavLink>
        ))}
      </div>
      {/* utility navigation*/}

      <div className="flex flex-col gap-xxs ">
        {utility.map((link, index) => (
          <NavLink to={link.path} key={index} className="navHover" data-content={link.name}>
            
            <NavItem icon={link.icon} text={link.name} isExpand={isExpand} />
          </NavLink>
        ))}
      </div>
      </div>
    </nav>
  );
}
