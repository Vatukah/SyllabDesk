import { useContext, useState } from "react";
import searchContext from "./searchContext";

export default function SearchProvider({children}){
    
    const [subject,setSubject] = useState("");
    const [chapters,setChapters] = useState([]);
    const [topics,setTopics] = useState([]);
    const [loading,setLoading] = useState(false)
    return(
        <searchContext.Provider value={{subject,setSubject,chapters,setChapters,topics,setTopics,loading,setLoading}}>
{children}
        </searchContext.Provider>
    )
}

export const useSearch = ()=> useContext(searchContext);

