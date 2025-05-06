

export async function fetchAllUsers() {
    const response = await fetch("http://localhost:5008/admin/users", { method:"get",credentials:"include" });
     return response;
  }