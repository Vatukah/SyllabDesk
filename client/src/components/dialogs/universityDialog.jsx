import { BuildingLibraryIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import PrimaryBtn from "../buttons/primaryBtn";
import SecondaryBtn from "../buttons/secondaryBtn";
import Loader from "../loader/loader";
import useUniversity from "../../hooks/api/useUniversity";
import useProgramme from "../../hooks/api/useProgramme";
import { showError, showSuccess } from "../../services/toastify";
import badges from "../../config/badges";
import useUserApi from "../../hooks/userApi/useUserApi";
import { useAuth } from "../../contexts/providers/authProvider";

export default function UniversityDialog({ isOpen, close, closeModel }) {
  const { intiLoading, university, error } = useUniversity();
  const {setUser,user} = useAuth();
  const {updateUniversity,isLoading : userApiLoading,error:userApiError} = useUserApi();

  const isUniversity = !!user?.university;
  const isCourse = !!user?.programme;

  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myUniversity, setMyUniversity] = useState(isUniversity?user.university:null);
  const [myProgramme, setMyProgramme] = useState(isCourse?user.programme:null);
  const [mySemester, setMySemester] = useState(isCourse?user.semester:null);

  const handleSelection = useCallback((state, value) => {
    let parsedValue;

    if (value === "") parsedValue = null;
    parsedValue = value;

    switch (state) {
      case "programme":
        setMyProgramme(parsedValue);
        break;
      case "semester":
        setMySemester(parsedValue);
        break;
      case "university":
        setMyUniversity(parsedValue);
        break;
      default:
        return;
    }
  },[myProgramme,myUniversity,mySemester]);

  const handleSubmit = async () => {
    if (!myUniversity || !myProgramme || !mySemester)
      return showError("Please fill all the details.");
     
    const payload = {
      university : myUniversity,
      programme : myProgramme,// university course
      semester : mySemester
    }
     const updatedProfile = await updateUniversity(payload);
     
     if(userApiError){
      return  showError(userApiError)
     }

     showSuccess("Enrollment completed");
     setUser(updatedProfile);
     closeModel();
  };

  useEffect(() => {
    if (isOpen) {
      const dialog = ref.current;
      if (!dialog.open) dialog.showModal();
      const handleClose = (e) => close?.(dialog.returnValue);

      dialog.addEventListener("close", handleClose);

      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    } else {
      const dialog = ref.current;
      if (dialog.open) dialog.close();
    }
  }, [isOpen, close]);

  return (
    <dialog
      open={isOpen}
      ref={ref}
      className=" w-full h-full fixed top-0 left-0 z-30 bg-transparent  md:py-xs"
    >
      <div className="flex flex-col primary-bg w-full max-w-[800px] h-full md:w-1/2 mx-auto border border-[rgba(var(--accent-light))] md:rounded-md p-xs">
        <div className="flex items-center gap-xs border-b-1 border-gray-400 p-xs">
          <BuildingLibraryIcon className="w-10 text-accent primary-bg-dark p-xxs rounded-md" />
          <h3 className="font-bold text  ">Choose your University</h3>
        </div>
        <div id="formContainer" className="w-full grow-1 overflow-auto">
          {intiLoading ? (
            <Loader text={"Getting ready"} />
          ) : (
            <Form
              university={university}
              mySemester={mySemester}
              myUniversity ={myUniversity}
              myProgramme ={myProgramme}
              handleSelection={handleSelection}
            />
          )}
        </div>
        <div className="w-fit h-max pt-xs px-sm flex gap-md items-center ml-auto  ">
          <div>
            <SecondaryBtn value={"Cancel"} action={closeModel} />
          </div>
          <div>
            {" "}
            <PrimaryBtn value={userApiLoading?"Submitting":"Submit"} action={handleSubmit} />
          </div>
        </div>
      </div>
    </dialog>
  );
}

function Form({ university = [], mySemester, handleSelection ,myProgramme,myUniversity}) {
  const { getUniversityProgrammes, programmes, error, isLoading } = useProgramme();
 
  const {user} = useAuth()
 

  const [totalSemester, setTotalSemester] = useState(0);

  const getTotalSemester = (id) => {
    if (id === "") return setTotalSemester(0);
    const selectedCourse = programmes.find((course) => course.university_programme_id === id);
    const totalSemester = selectedCourse.total_semester || 0;

    setTotalSemester(totalSemester);
  };

  const convertToObject =(name,idPara)=>{
    if(!idPara) return ;
    switch(name){
      case "university" : 
       const uni = university.find((uni)=> uni.id === idPara);
       return uni ? {id:uni.id,name:uni.name} : null;
       case "programme" : 
       const course = programmes.find((course)=> course.university_programme_id === idPara);
       return course ? {id:course.university_programme_id,name:course.programme_name}: null;
       default:
        return;
    }
  }

  useEffect(()=>{
   if(myUniversity){
    getUniversityProgrammes(myUniversity.id)
   }
  
  
  },[myUniversity])
  
  useEffect(()=>{
 if (myProgramme && programmes.length > 0) {
    getTotalSemester(myProgramme.id);
  }
  },[programmes,myProgramme])

  return (
    <form method="dialog" className=" w-full h-auto p-xs" aria-disabled>
      <div className="my-xs">
        <label className="block text-sm font-medium text-accent my-xs">
          Your University
        </label>
        <select
          name="university"
          id="university"
          className="border border-gray-400 w-full p-xs rounded-md text"
          value={myUniversity?.id||""}
          onChange={(e) => {
            const name = e.target.name;
            const id = e.target.value;
            handleSelection(name,convertToObject(name,id));
            getUniversityProgrammes(e.target.value);
          }}
        >
          <optgroup name="university">
            <option value=""> Select University</option>
            {university.map((uni, index) => (
              <option value={uni.id} key={index}>
                {uni.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <div className="my-md">
        <label className="block text-sm font-medium text-accent my-xs">
          {isLoading ? "loading programmes..." : "University's Programme"}
        </label>
        <select
          name="programme"
          id="programme"
          className="border border-gray-400 w-full p-xs rounded-md text disabled:text-gray-400"
           value={myProgramme?.id||""}
          onChange={(e) => {
            const name = e.target.name;
            const id = e.target.value;
            handleSelection(name,convertToObject(name,id));
           
            getTotalSemester(e.target.value);


          }}
          disabled={!myUniversity?.id}
        >
          <optgroup name="programme">
            <option value=""> Select Programme</option>
            {programmes.map((programme, index) => (
              <option value={programme.university_programme_id} key={index}>
                {programme.programme_name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <div className="my-md">
        <label className="block text-sm font-medium text-accent my-xxs">
          Your Semester
        </label>
        {totalSemester === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-10 text-gray-400">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.945M12 14L5.84 10.578A12.083 12.083 0 006 20.945M12 14v8"
              />
            </svg>
            <p className="text-lg">
              Select a programme to see available semesters
            </p>
          </div>
        )}

        {totalSemester > 0 && (
          <div className="grid grid-cols-4 gap-xs p-sm justify-items-center w-fit h-fit  mx-auto">
            {badges.slice(0, totalSemester).map((badge, index) => {
            
              const isSelected =  (mySemester === index + 1)
             
              return (
                <div
                  key={index}
                  data-badge-name={badge.name}
                  className={`p-xs rounded-md select-none  transition-transform text-center text-sm badgeImg  relative ${
                    (isSelected)
                      ? " accent-light  wave "
                      : " hover:primary-bg-dark scale-[.8]"
                  }
                   ${!mySemester ? "entry" : ""}`}
                  onClick={() => handleSelection("semester", index + 1)}
                >
                  <img src={badge.image} alt={badge.name} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}
