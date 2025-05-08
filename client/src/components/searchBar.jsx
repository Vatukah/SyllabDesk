import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Box } from "@mui/material";
import CTA_btn from "./buttons/CTA_btn";
import { Search } from "@mui/icons-material";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [isFocus,setIsFocus] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (topic) params.append("topic", topic);
    navigate(`api/search/${query}`);
  };
   
  const clearQuery=()=>{
    setQuery("");
  }
  useEffect(()=>{
    const searchBox = document.getElementById("searchBox");
     
    const handleFocusIn=()=> setIsFocus(true);
    const handleFocusOut=()=> setIsFocus(false);
    if(searchBox){
      addEventListener('focusin',handleFocusIn);
      addEventListener('focusout',handleFocusOut);
    }

    return ()=>{
      if(searchBox){
        removeEventListener('focusin',handleFocusIn);
        removeEventListener('focusout',handleFocusOut);
      }
    }
  },[])

  return (
    // <Box
    //   display="flex"
    //   alignItems="center"
    //   gap={2}
    //   px={1}
    //   bgcolor={"Background"}
    //   sx={{
      
    //     borderRadius: "12px",
    //     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    //     maxWidth: "700px",
    //     margin: "0 auto",
    //   }}
    //   flexGrow={1}
    // >
    //   <input
    //     type="text"
    //     placeholder="Search course..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     style={{
    //       flex: 1,
    //       padding: "10px 14px",
    //       border: "none",
    //       borderRadius: "8px",
    //       fontSize: "16px",
    //       outline: "none",
    //     }}
    //   />
      
    //   <Button
    //     variant="contained"
    //     onClick={handleSearch}
    //     sx={{ borderRadius: "8px", textTransform: "none", paddingX: 3 }}
    //   >
    //     Search
    //   </Button>
    // </Box>
  <div className="grow-1 " >
   <div className={`${isFocus?"border-[var(--accent)]":"border-transparent"} border primary-bg  w-[80%] max-w[800px] mx-auto flex items-center rounded-full overflow-hidden  p-1 transition-[background-color]`}>
    <div className="w-12 h-full hover:primary-bg-dark hover:cursor-pointer py-1 rounded-full shrink-0 grow-0" onClick={handleSearch}><MagnifyingGlassIcon className="text-accent w-6 h-6 mx-auto"/></div>
    <input type="text" name="search" id="searchBox" className="grow-1 border-none outline-none px-2" placeholder="Search " autoComplete="off" value={query} onChange={(e)=> setQuery(e.target.value)}/>
    {(query.length > 0) && <div className="w-12 h-full hover:primary-bg-dark hover:cursor-pointer py-1 rounded-full shrink-0 grow-0" onClick={clearQuery}><XMarkIcon className="text-accent w-6 h-6 mx-auto"/></div>}
   </div>
  </div>
  );
}
