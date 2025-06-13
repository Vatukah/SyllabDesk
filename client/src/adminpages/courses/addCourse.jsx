import AddCourseForm from "../../components/forms/addCourseForm";
import Breadcrum from "../../components/navbar/breadcrumNav";
import { Outlet } from "react-router";

export default function AddCourse() {
  return (
    <section className="p-md w-full">
      <Breadcrum />
      <Outlet />
    </section>
  );
}
