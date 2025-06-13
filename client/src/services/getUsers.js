import { API_URL } from "../config/apiUrl";


export async function fetchAllUsers() {
    const response = await fetch(`${API_URL}admin/users`, { method:"get",credentials:"include" });
     return response;
  }