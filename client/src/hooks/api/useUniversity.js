import { useEffect, useState } from "react";
import { API_URL } from "../../config/apiUrl";


export default function useUniversity() {
  const [initLoading, setInitLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [university, setUniversity] = useState([]);
 
  useEffect(() => {
   
   (async () => {
      try {
         setInitLoading(true);
        const response = await fetch(`${API_URL}university`,{method:"GET"});

        const {data} = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setUniversity(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setInitLoading(false);
      }
    })();
  }, []);

  return {initLoading,isLoading,university,error}
}
