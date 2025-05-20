import { useEffect, useState } from "react";
import DynamicTable from "../components/dynamicTable";
import { API_URL } from "../config/apiUrl";
import { showError } from "../services/toastify";

const Courses = () => {
  const [filterText, setFilterText] = useState("");
  const [courses, setCourses] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const onClear = () => {
    setFilterText("");
  };

  const columns = [
    {
      name: "Course Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created_at",
      selector: (row) => row.created_at.slice(0,10),
    },
  ];
  const data = [
    {
      name: "Bsc IT",
      created_at: "2025-05-20 ty",
    },
    {
      name: "Msc IT",
      created_at: "2025-05-21 ty",
    },
  ];

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}admin/courses`, {
        method: "get",
        credentials: "include",
      });

      const { data } = await response.json();

      if (response.ok) {
        return setCourses(data);
      }

      throw new Error(data.message);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <section className="p-md">
      <div className="primary-bg shadow-md border border-[rgba(var(--accent-light),0.5)] rounded-md overflow-hidden">
        <DynamicTable
          title={"Courses"}
          columns={columns}
          data={courses.filter((course) =>
            course.name?.toLowerCase().includes(filterText.toLowerCase())
          )}
          filterText={filterText}
          onFilter={setFilterText}
          onClear={onClear}
        />
      </div>
    </section>
  );
};

export default Courses;
