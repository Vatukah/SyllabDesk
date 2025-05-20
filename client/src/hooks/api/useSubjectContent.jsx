import { useState, useEffect } from "react";
import { API_URL } from "../../config/apiUrl";
export default function useSubjectContent(currentTopic) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    if (!currentTopic) {
      throw new Error("Invalid Request!");
    }

    try {
      setLoading(true);
    
      const res = await fetch(
        `${API_URL}api/search/get-note/${currentTopic?.id}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Not Found");
      }

      const { content: fetchedContent } = data;

      setContent(fetchedContent);
    } catch (error) {
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [currentTopic]);

  return { content, error, loading, fetchContent };
}
