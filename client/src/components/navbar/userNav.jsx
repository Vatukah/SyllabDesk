import { useUtility } from "../../contexts/providers/utilityProvider";
import { NavLink, useNavigate } from "react-router";
import avatar from "../../assets/avatar.svg";
import { useAuth } from "../../contexts/providers/authProvider";
import {
  HomeIcon,
  Squares2X2Icon,
  BookOpenIcon,
  DocumentTextIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import NavItem from "./navItem";
import "../../styles/btn.css";
export default function UserNav() {
  const { setIsRightSideBar } = useUtility();
  const { user, setUser, isAdmin } = useAuth();
  const navigate = useNavigate();
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
      path: "/notes",
      icon: <DocumentTextIcon />,
    },
  ];

  const protectedLink = [
    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: <UserIcon />,
      action: () => {
        navigate("/admin/dashboard");
      },
    },
  ];

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5008/logout", {
      method: "GET",
      credentials: "include",
    });
    const logout = await response.json();
    setUser(null);
    setIsRightSideBar(false);
    navigate(logout.redirect);
  };

  return (
    <>
      <div className="userInfo w-full primary-bg rounded-lg px-1 py-4">
        <div className="w-24 h-24 p-1 rounded-lg shrink-0 overflow-hidden primary-bg mx-auto">
          <img
            src={avatar}
            alt=""
            className="w-full h-auto max-w-none max-h-none  "
          />
        </div>

        <div className=" overflow-hidden shrink-0 grow-0">
          <div className="truncate max-w-full whitespace-nowrap overflow-hidden text-ellipsis font-bold text-center mt-2">
            {user?.username}
          </div>
          <div className="truncate max-w-full whitespace-nowrap overflow-hidden text-ellipsis font-bold text-center mt-xxs">
            {user?.email}
          </div>
          <div className="flex justify-evenly items-center gap-2 my-2">
            <div>
              <div className="font-bold text-xs text-accent">University</div>
              <div className="">HNBGU</div>
            </div>
            <div>
              <div className="font-bold text-xs text-accent">Programme</div>
              <div className="">B.Sc IT</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 my-2">
          {navigationLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className="navHover"
              data-content={link.name}
            >
              <NavItem icon={link.icon} text={link.name} key={index} />
            </NavLink>
          ))}

          {isAdmin &&
            protectedLink.map((link, index) => (
              <NavLink to={link.path} key={index} className="navHover">
                {" "}
                <NavItem icon={link.icon} text={link.name} />{" "}
              </NavLink>
            ))}
          <div className="danger-action" onClick={handleLogout}>
            <NavItem
              icon={<ArrowRightStartOnRectangleIcon />}
              text={"Log Out"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
