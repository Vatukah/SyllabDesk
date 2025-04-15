import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
export default function ImageGrid({ prop }) {
  const imageGridRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleGridWidth = () => {
      if (imageGridRef.current) {
        let w = imageGridRef.current.clientWidth;
        let h = imageGridRef.current.clientHeight / 2;

        let modifiedWidth = w - h;
        w = (modifiedWidth / w) * 100;
        setWidth(w);
      }
    };
    handleGridWidth()

    window.addEventListener("resize", handleGridWidth);

    return () => window.removeEventListener("resize", handleGridWidth);
  }, [width]);

  return (
    <div
      data-bento-grid={prop.name}
      className="lg:col-span-2 relative rounded-xxl overflow-hidden "
      ref={imageGridRef}
      style={{ "--width": width }}
    >
      <img
        src={prop.img}
        alt={prop.name}
        className="absolute top-[50%] left-[5%] translate-y-[-50%] aspect-square h-[100%] object-cover z-index-1"
      />
      <div className="flex flex-col  items-end h-full w-[30%] text-end ml-auto py-4 px-6 gap-4 flexbox z-index-2">
        <div className="text-xxl font-bold text-primary grid-text   ">
          {prop.text}
        </div>

        <div className="bento-btn primary-bg">
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}
