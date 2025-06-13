import { useContext, useReducer } from "react"
import { courseFormContext } from "../allContexts";
import { initialCourseFormState,courseFormReducer } from "../reducer/courseFormReducer";

export default function CourseFormProvider({children}){
    
    const [state,dispatch] = useReducer(courseFormReducer,initialCourseFormState);
    
    return (
        <courseFormContext.Provider value={{...state,dispatch}}>
{children}
        </courseFormContext.Provider>
    )
}

export const useCourseForm = () => useContext(courseFormContext);