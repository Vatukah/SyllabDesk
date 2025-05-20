import { useContext, useState } from "react";
import { adminContext } from "../allContexts";
import { fetchAllUsers } from "../../services/getUsers";


export default function AdminProvider({ children }) {
  const [totalUsers, setTotalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const init = async () => {
   fetchAllUsers()
         .then((res) => res.json())
         .then((d) => setTotalUsers(d?.data))
         .catch(console.error)
         .finally(() => setLoading(false));
  };
  return (
    <adminContext.Provider value={{ totalUsers, loading, init }}>
      {children}
    </adminContext.Provider>
  );
}

export const useAdmin = ()=> useContext(adminContext);
