import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCourseOutline } from "../contexts/providers/CourseOutlineProvider";

export default function SearchBar() {
  const { setSubject } = useCourseOutline();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query === "") return;
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (topic) params.append("topic", topic);
    navigate(`api/search/${query}`);
    setSubject(query);
  };

  const clearQuery = () => {
    setQuery("");
  };
  useEffect(() => {
    const searchBox = document.getElementById("searchBox");

    const handleFocusIn = () => setIsFocus(true);
    const handleFocusOut = () => setIsFocus(false);

    if (searchBox) {
      searchBox.addEventListener("focusin", handleFocusIn);
      searchBox.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      if (searchBox) {
        searchBox.removeEventListener("focusin", handleFocusIn);
        searchBox.removeEventListener("focusout", handleFocusOut);
      }
    };
  }, []);

  return (
    <div className="grow-1  z-30 ">
      <div
        className={`${
          isFocus ? "border-[var(--accent)]" : "border-transparent"
        }  flex border primary-bg  w-[70%] max-w[800px] mx-auto  items-center  rounded-full overflow-hidden  p-1 transition-[background-color] z-40`}
      >
        <div
          className="w-12 h-full hover:primary-bg-dark hover:cursor-pointer py-1 rounded-full shrink-0 grow-0"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="text-accent w-6 h-6 mx-auto" />
        </div>
        <input
          type="text"
          name="search"
          id="searchBox"
          className="grow-1 border-none outline-none px-2"
          placeholder="Search "
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
           
          }}
        />
        {query.length > 0 && (
          <div
            className="w-12 h-full hover:primary-bg-dark hover:cursor-pointer py-1 rounded-full shrink-0 grow-0"
            onClick={clearQuery}
          >
            <XMarkIcon className="text-accent w-6 h-6 mx-auto" />
          </div>
        )}
      </div>
      {/* <div className="w-fit md:hidden mx-auto">
        <div
          className="w-12 h-full hover:primary-bg-dark hover:cursor-pointer py-1 rounded-br-full rounded-bl-full shrink-0 grow-0 primary-bg"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="text-accent w-6 h-6 mx-auto" onClick={()=>setIsFocus(true)}/>
        </div>
     
      </div>
      <div className={`absolute -top-full md:top-0 left-[50%]  w-[100%] translate-x-[-50%]   `} style={{zIndex:"-1"}}>
      <div className="w-full md:hidden"> <input
          type="text"
          name="search"
          id="searchBox"
          className="w-full border-none outline-none px-2 primary-bg"
          placeholder="Search "
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
           
          }}
        /></div>
      <div className={`w-full  primary-bg-blur transition-all ${isFocus?"h-100":"h-0"}`}>

      </div>
      
       <div className=" primary-bg-blur w-fit mx-auto md:w-full h-xxl  rounded-br-full rounded-bl-full" >

       </div>
      </div> */}
     
    </div>
  );
}
