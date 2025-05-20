import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router";




import useSubjectContent from "../../hooks/api/useSubjectContent";
import { useCourseOutline } from "../../contexts/providers/CourseOutlineProvider";

import useInitCourseOutline from "../../hooks/api/useIntiCourseOutline";
import MarkdownToHtml from "../../components/markdownToHtml";
import NotFound from "../statusPage/notFound";
export default function CourseContent() {


  const [searchParams] = useSearchParams();
  const { subject: subjectQuery } = useParams();
  const query = searchParams.get("query")?.toLowerCase();
  const queryTopic =  searchParams.get("topic")?.replaceAll("_", " ").toLowerCase() || ""
  const [markdown, setMarkdown] = useState("");
  

  // const {content,fetchContent,loading} = useSubjectContent(subjectQuery,"introduction",topic);

  const { initLoading,error } = useInitCourseOutline(subjectQuery, queryTopic);

  // useEffect(() => {
  //   const search = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(
  //         `http://localhost:5008/api/search/${subjectQuery}?topic=${topic?topic:"Intro C#"}`,
  //         {
  //           method: "get",
  //         }
  //       );

  //       if (!res.ok) {
  //         throw new Error("something went wrong");
  //       }
  //       const { subjects, chapters, topics, markdown } = await res.json();

  //       setSubject(subjects);
  //       setChapters(chapters);
  //       setTopics(topics);
  //       setMarkdown(markdown);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   search();
  // }, [subjectQuery]);

  useEffect(()=>{
  
  },[subjectQuery])

 
  if (initLoading) return <div>loading...</div>;

  if(error) return <NotFound message={error}/>

  return <MarkdownToHtml />;
}
