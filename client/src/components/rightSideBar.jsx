import { useEffect } from "react";
import { useUtility } from "../contexts/utilityContext/utilityProvider";

export default function RightSideBar({ children }) {
  const { isRightSideBar, rightNavRef, leftNavRef, setIsRightSideBar } =
    useUtility();

  useEffect(() => {
    const handleCloseRightNav = (event) => {
      if (!isRightSideBar) return;

      if (
        event.target !== rightNavRef.current &&
        !rightNavRef.current.contains(event.target)
      ) {
        // Close the sidebar here
        setIsRightSideBar(false);
      }
    };
    document.addEventListener("click", handleCloseRightNav);

    return () => {
      document.removeEventListener("click", handleCloseRightNav);
    };
  });
  return (
    <div
      className={`${
        !isRightSideBar ? "w-0" : "w-[16rem] px-2 py-2"
      } overflow-hidden transition-[width] primary-bg-blur rounded-tl-xxl ${
        isRightSideBar ? "ml-2" : "ml-4"
      }  `}
      ref={rightNavRef}
    >
      {children}
    </div>
  );
}
