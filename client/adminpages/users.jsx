import { useEffect, useState } from "react";
import { fetchAllUsers } from "../src/services/getUsers";
import DynamicTable from "../src/components/dynamicTable";
import TableSkeleton from "../src/components/tableSkeleton";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "fullName", headerName: "Full Name" },
    { field: "university", headerName: "University" },
    { field: "course", headerName: "Course" },
  ];

  const rows = (users) => {
    return (
      users?.map((user) => ({
        id: user.id,
        fullName: user.full_name,
        university: user.university,
        course: user.course,
      })) || []
    );
  };
  useEffect(() => {
    fetchAllUsers()
      .then((res) => res.json())
      .then((d) => setUsers(d?.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <TableSkeleton rows={8} columns={4} />
      ) : (
        <DynamicTable title={"Users"} rows={rows(users)} columns={columns} />
      )}
    </>
  );
}
