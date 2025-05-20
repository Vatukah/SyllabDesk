import { useNavigate } from "react-router"
import { useCourseOutline } from "../../../contexts/providers/CourseOutlineProvider";
export default function Topic({name,handleClick}){
   const navigate = useNavigate();
  const {currentTopic} = useCourseOutline();
    return(
        <li className={`${currentTopic.name === name?"primary-bg-blur":""} pl-1 rounded-sm select-none hover:primary-bg-blur mt-1`} onClick={()=> {
            handleClick();
            navigate(`/api/search/c?topic=${name?.replaceAll(" ","_")}`)}}>{name}</li>
    )
}