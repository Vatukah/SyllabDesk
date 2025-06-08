import { useEffect, useState } from "react";
import { API_URL } from "../../config/apiUrl";

export default function useProgramme() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [programmes, setProgrammes] = useState([]);
  const getUniversityProgrammes = async (universityId = null ) => {
    try {
      setIsLoading(true);
      if (!universityId ) throw new Error("unknown University");
      const response = await fetch(
        `${API_URL}university_programmes?universityId=${universityId}`,
        { method: "GET" }
      );

      const { programmes, details } = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

    const filteredDetails ={};
    // filtering relevant details
    details.forEach((detail)=>{
        const {id:university_programme_id,programme_id,duration,total_semester} = detail;
        filteredDetails[programme_id]={university_programme_id,programme_id,duration,total_semester};
     })
 // adding course name
    const programmeDetails = programmes.map((programme)=>{
         const detail = filteredDetails[programme.id];
         return {...detail,programme_name:programme.name}
    }) 
      
 
      setProgrammes(programmeDetails);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { programmes, isLoading, error, getUniversityProgrammes };
}
