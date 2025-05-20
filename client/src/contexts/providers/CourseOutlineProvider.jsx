import { useContext, useState } from "react";
import{ CourseOutlineContext} from '../allContexts.js'

export default function CourseOutlineProvider({children}){
    
    const [subject,setSubject] = useState(null);
    const [chapters,setChapters] = useState([]);
    const [topics,setTopics] = useState([]);
    const [currentTopic,setCurrentTopic]= useState({});
   
    return(
        <CourseOutlineContext.Provider value={{subject,setSubject,chapters,setChapters,topics,setTopics,setCurrentTopic,currentTopic}}>
{children}
        </CourseOutlineContext.Provider>
    )
}

export const useCourseOutline = ()=> useContext(CourseOutlineContext);

