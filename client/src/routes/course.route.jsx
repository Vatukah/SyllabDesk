import { Route } from "react-router";
import Courses from "../adminpages/courses/courses";
import CoursesTable from "../adminpages/courses/courseTable";
const courseRoute =(
     <Route path="courses" element={<Courses />} >
        <Route index element={<CoursesTable/>}/>
     </Route>
)

export default courseRoute;