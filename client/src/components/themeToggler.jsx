import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext/theme.js";

export default function Theme_toggler() {
  const { choosenTheme, set_to_dark, set_to_light } = useTheme();

  return (
    <div>
      {choosenTheme === "light" ? (
        <div onClick={set_to_dark} className="text w-lg flex justify-center items-center cursor-pointer" title="light theme">
         <SunIcon  />
        </div>
      ) : (
        <div onClick={set_to_light} className=" text w-lg  flex justify-center items-center cursor-pointer" title="dark theme">
        <MoonIcon className="w-md"/>
        </div>
      )}
    </div>
  );
}
