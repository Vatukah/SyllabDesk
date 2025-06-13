import CoursesTable from "./courseTable";
import PrimaryBtn from "../../components/buttons/primaryBtn";
import { useNavigate } from "react-router";
export default function CourseHome(){
    const navigate = useNavigate()
    return(
        <>
        <div id="primaryActionBar" className="w-full p-xxs flex justify-end gap-sm" >
            <PrimaryBtn value={"Add Course"} action={()=> navigate("/admin/add-course") }/>
        </div>
        <CoursesTable/>
        </>
    )
}