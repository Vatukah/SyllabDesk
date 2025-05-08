import { useEffect } from "react";
import { useSearchParams,useParams } from "react-router";
import { useSearch } from "../../contexts/searchContext/searchProvider";
export default function SearchOutput() {
  const { setSubject, setChapters, setTopics, setLoading } = useSearch();

  const [searchParams] = useSearchParams();
  const {subject:subjectQuery} = useParams();
  const query = searchParams.get("query")?.toLowerCase();
  const topic = searchParams.get("topic")?.toLowerCase(); 
  console.log(subjectQuery)

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5008/api/search/${subjectQuery}`,
          {
            method: "get",
          }
        );

        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const { subjects, chapters, topics } = await res.json();

        setSubject(subjects);
        setChapters(chapters);
        setTopics(topics);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [searchParams]);
  return (
    <>
      <h3>{query}</h3>
      <h4>{topic}</h4>
    </>
  );
}
