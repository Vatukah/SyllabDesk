import { useEffect, useState } from "react";
import { useCourseOutline } from "../../contexts/providers/CourseOutlineProvider";
import { API_URL } from "../../config/apiUrl";

export default function useInitCourseOutline(sub, topic) {
  const { setChapters, setTopics, setSubject ,setCurrentTopic} = useCourseOutline();
  const [initLoading, setInitLoading] = useState(false);
  const [error,setError] = useState(null)
  const init = async () => {
    if ( !sub) {
      throw new Error("Invalid Request!");
    }

    try {
      setInitLoading(true);

      const res = await fetch(`${API_URL}api/search/${sub}?topic=${topic}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const { chapters, topics,currentTopic,subject} = data;
      
      setSubject(subject);
      setChapters(chapters);
      setTopics(topics);
      setCurrentTopic(currentTopic)
      setError(null)
    } catch (error) {
      setSubject(null);
      setChapters([]);
      setTopics([]);
      setCurrentTopic({})
      setError(error.message );
    } finally {
      setInitLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [sub]);

  return { initLoading,error };
}
