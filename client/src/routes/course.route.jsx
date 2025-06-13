import { Route } from "react-router";
import Courses from "../adminpages/courses/courses";

import CourseHome from "../adminpages/courses/courseHome";
import AddCourse from "../adminpages/courses/addCourse";
import AddChapter from "../components/forms/addChapterForm";
import AddTopicsForm from "../components/forms/addTopicForm";
import CourseFormProvider from "../contexts/providers/courseFormContext";
import AddCourseForm from "../components/forms/addCourseForm";
const courseRoute = (
  <>
    <Route path="courses" element={<Courses />} />

    <Route
      path="add-course"
      element={
        <CourseFormProvider>
          <AddCourse />
        </CourseFormProvider>
      }
    >
      <Route index element={<AddCourseForm />} />
      <Route path="add-chapter" element={<AddChapter />} />
      <Route path="add-chapter/add-topic/:chapterId" element={<AddTopicsForm />} />
    </Route>
  </>
);

export default courseRoute;
