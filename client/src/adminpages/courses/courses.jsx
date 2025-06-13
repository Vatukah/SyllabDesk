
import { Outlet } from "react-router";
import Breadcrum from "../../components/navbar/breadcrumNav";
import CourseHome from "./courseHome";

const Courses = () => {


  return (
    <section className="p-md w-full">
      <CourseHome/>
      
    </section>
  );
};

export default Courses;
