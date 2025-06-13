// AddTopics.jsx
import React, { useState } from "react";
import MarkdownEditor from "../markdownEditor";
import { useParams } from "react-router";
import { useCourseForm } from "../../contexts/providers/courseFormContext";

export default function AddTopicsForm({handleAddTopic}) {
  const {course,currentChapter,dispatch} = useCourseForm();
   const param = useParams();
   const {chapterId} = param;

   const initialState ={
    name: "",
    topic_order: "",
    content: "",
  }
  
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = ({ text }) => {
    setForm((prev) => ({ ...prev, content: text }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch({type:"ADD_TOPIC",payload:form});
     setForm(initialState);
    // Submit logic here (API call, Supabase insert, etc.)
  };

  return (
   
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Topic Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter topic name"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Topic Order</label>
          <input
            type="number"
            name="topic_order"
            value={form.topic_order}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter order"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Topic Content</label>
          <MarkdownEditor value={form.content} setValue={(value)=> setForm((prev)=> ({...prev,content:value}))} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Topic
        </button>
      </form>
   
  );
}
