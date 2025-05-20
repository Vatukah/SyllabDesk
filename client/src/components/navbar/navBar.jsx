import { useEffect, useRef, useState } from "react";
import { data, NavLink, useNavigate } from "react-router";
import { adminNavigationLinks } from "../../config/adminNavigation.js";

import {
  HomeIcon,
  Squares2X2Icon,
  BookOpenIcon,
  DocumentTextIcon,
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import NavItem from "./navItem";

import "../component.css";

export default function Navbar() {
  const [isExpand, setIsExpand] = useState(true);
  const navigate = useNavigate();
  

  

  return (
    <nav
      className={`h-full ${
        isExpand ? "w-[14rem]" : "w-[3.65rem]"
      } px-2  pt-md  transition-[width] text select-none`}
      data-expanded={isExpand}
    >
      {/* content navigation */}
      <Bars3Icon
        className={`w-md ${isExpand ? "ml-auto mr-2" : "mx-auto"} cursor-pointer  `}
        onClick={() => setIsExpand(!isExpand)}
        title={isExpand ? "Close Menu" : "Expand Menu"}
      />
      <div className="flex justify-between flex-col gap-sm h-full py-xl ">
        <div className="flex flex-col gap-xxs">
          {adminNavigationLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className="navHover"
              data-content={link.name}
            >
              <NavItem
                icon={<link.icon />}
                text={link.name}
                key={index}
                isExpand={isExpand}
              />
            </NavLink>
          ))}
        </div>
       
      </div>
    </nav>
  );
}
