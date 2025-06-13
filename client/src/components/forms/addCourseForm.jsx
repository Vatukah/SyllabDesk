import { useState, useRef } from "react";
import PrimaryBtn from "../buttons/primaryBtn";
import { resizeImageToBanner } from "../../utils/resizeImageToBanner";
import { showError } from "../../services/toastify.js";
import AddChapter from "./addChapterForm.jsx";
import SecondaryBtn from "../buttons/secondaryBtn.jsx";
import { useNavigate } from "react-router";
import { useCourseForm } from "../../contexts/providers/courseFormContext.jsx";
import DraggableBar from "../draggableBar.jsx";

export default function AddCourseForm({ onSubmit }) {
  const {course,CurrentChapter, dispatch} = useCourseForm()
  const [courseName, setCourseName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const isBtnExpands = course?.chapters?.length === 0;
  const dropRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleImageSelect = async (file) => {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      showError("Only JPG and PNG files are allowed.");
      return;
    }

    try {
      const { file: resizedFile, previewURL } = await resizeImageToBanner(file);
      dispatch({type:"SET_COURSE",payload:{image:resizedFile}})
      setCoverImage(resizedFile);
      setPreviewURL(previewURL);
    } catch (err) {
      showError("Image processing failed");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageSelect(file);
    dropRef.current.classList.remove("ring-2", "ring-blue-400");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("ring-2", "ring-blue-400");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("ring-2", "ring-blue-400");
  };

  const handleClickPreview = () => {
    inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
     
    

    setCourseName("");
    setCoverImage(null);
    setPreviewURL(null);
  };


  return (<>
    <form
      onSubmit={handleSubmit}
      className="w-full  mx-auto p-6 primary-bg  space-y-6"
    >
      <div>
      <h2 className="text-lg font-semibold ">
        Add New Course
      </h2>
      <p>Fill out the details below to create a new course.
Make sure all required fields are complete and accurate before saving.</p></div>
  {/* Course Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-accent">
          Course Name
        </label>
        <input
          type="text"
        
          
          placeholder="e.g., React Bootcamp"
          className="w-full px-4 py-2 text-lg font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent-light),1)]"
          onBlur={(e)=>  dispatch({ type: "SET_COURSE", payload:{ name: e.target.value} })}
        />
      </div>
    
      {/* Cover Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Cover Image
        </label>

        <div
          ref={dropRef}
          onClick={handleClickPreview}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative w-full aspect-[4/1] ${coverImage?"border-0":"border-2"} border-dashed border-[rgba(var(--accent-light),1)] primary-bg-dark hover:primary-bg rounded-md cursor-pointer overflow-hidden transition`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleImageSelect(e.target.files[0])}
            className="hidden"
          />

          {!previewURL ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm text-center px-2">
              Drag & drop image here or click to select
            </div>
          ) : (
            <img src={previewURL} alt="Preview" className=" object-contain" />
          )}
        </div>
      </div>
      
      </form>
      <hr className="text-[var(--bg-blur-color)] my-lg"/>
      <h3>Chapters</h3>
      <div className=" space-y-2">
      
          {course?.chapters?.map((ch,index)=> <DraggableBar key={ch.id} item={ch} handleEdit={()=>alert("editing")}/>)}
      
           
      <div className={`ml-auto ${isBtnExpands?"w-full":"w-fit"}`}><SecondaryBtn value={"Add Chapter"} expand={isBtnExpands} action={()=> {
        navigate("add-chapter")
       dispatch({type:"SET_CURRENT_CHAPTER",payload:null});
        }}/></div>
 </div>
      <PrimaryBtn value={"Add Course"} expand={true} action={handleSubmit}/>
    </>
  );
}
