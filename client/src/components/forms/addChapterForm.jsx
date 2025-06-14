import { useState } from "react";
import MarkdownEditor from "../markdownEditor";
import AddTopicsForm from "./addTopicForm";
import SecondaryBtn from "../buttons/secondaryBtn";
import { data, useNavigate } from "react-router";
import { useCourseForm } from "../../contexts/providers/courseFormContext";
import PrimaryBtn from "../buttons/primaryBtn";
import DraggableBar from "../draggableBar";

export default function AddChapter({ onSubmit }) {
  const { course, currentChapter, dispatch } = useCourseForm();
  const isChapter = !!currentChapter;

  const initialiseState = (bool) => {
    return bool
      ? course?.chapters.filter((ch) => ch?.id === currentChapter)[0]
      : {
          name: "",
          order: 1,
        };
  };
  const [form, setForm] = useState(initialiseState(isChapter));

  const [isSave, setIsSave] = useState(isChapter);

  const navigate = useNavigate();

  const handleCloseDialog = (value) => {
    console.log(value);
    setIsTopicDialog(false);
  };

  const handleChange = (index, value) => {
    const updated = [...chapters];
    updated[index] = value;
    setChapters(updated);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourseData((prev) => ({ ...prev, chapters: [...prev?.chapters, form] }));
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold ">Chapters</h2>

        <input
          type="text"
          value={form?.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder={`Chapter name`}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={form?.order}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, order: e.target.value }))
          }
          placeholder={`Chapter Order`}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-right">
          {!isSave && (
            <PrimaryBtn
              disable={isSave}
              value={"Save"}
              action={() => {
                dispatch({ type: "ADD_CHAPTER", payload: form });
                setIsSave(true);
              }}
            />
          )}
          {isSave && (
            <PrimaryBtn
              value={"Update"}
              action={() => {
                dispatch({
                  type: "UPDATE_CHAPTER",
                  payload: {
                    id: currentChapter,
                    ...form,
                  },
                });
              }}
            />
          )}
        </div>
      </form>
      <hr className="text-[var(--bg-blur-color)] my-lg" />
      <div
        className={`${
         isSave && form.id
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        }`}
      >
        <h3>Topics</h3>
        {currentChapter &&
          course.chapters
            .filter((ch) => ch.id === currentChapter)[0]
            ?.topics?.map((topic, index) => (
              <DraggableBar key={topic?.topic_order} text={topic.name} />
            ))}
        <SecondaryBtn
          value={"Add Topic"}
          expand={true}
          action={() => navigate(`add-topic/${currentChapter}`)}
        />
      </div>
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={handleAddChapter}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          + Add Chapter
        </button>
      </div>
    </>
  );
}
