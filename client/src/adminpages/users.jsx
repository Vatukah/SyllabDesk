import { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/getUsers";
import DynamicTable from "../components/dynamicTable";
import TableSkeleton from "../components/tableSkeleton";
import { useAdmin } from "../contexts/providers/adminProvider";
import { selectClasses } from "@mui/material";

export default function Users() {
  const { totalUsers, loading } = useAdmin();
  const [filterText, setFilterText] = useState("");

  const onClear = () => {
    setFilterText("");
  };

  

  const columns= [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      cell: (row)=> (
        <span className={`${row.role === 'admin'?"text-green-400 bg-green-100":"text-blue-400 bg-blue-100"} border py-1 px-2 rounded-sm `}>{row.role}</span>
      )
    },
    {
      name: "Course",
      selector: (row) => row.course,
      cell: (row) => (
        <span
          style={{
            color: row.course ? "inherit" : "#999",
            opacity: row.course ? 1 : 0.6,
          }}
        >
          {row.course || "Not selected"}
        </span>
      ),
    },
    {
      name: "University",
      selector: (row) => row.university,
      cell: (row) => (
        <span
          style={{
            color: row.university ? "inherit" : "#999",
            opacity: row.university ? 1 : 0.6,
          }}
        >
          {row.university || "Not selected"}
        </span>
      ),
    },
    {
      name: "Register_at",
      selector: (row) => row.register_at,
      sortable: true,
    },
  ];
  const rows = (users, filterText) => {
    const filteredUsers = users?.filter((user) =>
      user?.username.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      filteredUsers?.map((user) => ({
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
        university: user.university,
        course: user.course,
        register_at: user.created_at.slice(0, 10),
      })) || []
    );
  };

  

  if (loading) return <TableSkeleton rows={8} columns={4} />;
  return (
    <section className="p-md">
      <div className="primary-bg shadow-md border border-[rgba(var(--accent-light),0.5)] rounded-md overflow-hidden">
        <DynamicTable
          title={"Users"}
          data={rows(totalUsers, filterText)}
          columns={columns}
          filterText={filterText}
          onFilter={setFilterText}
          onClear={onClear}
          
        />
      </div>
    </section>
  );
}
