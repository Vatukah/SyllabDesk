import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router";




import useSubjectContent from "../../hooks/api/useSubjectContent";
import { useCourseOutline } from "../../contexts/providers/CourseOutlineProvider";

import useInitCourseOutline from "../../hooks/api/useIntiCourseOutline";
import MarkdownToHtml from "../../components/markdownToHtml";
import NotFound from "../statusPage/notFound";
import Loader from "../../components/loader/loader";
export default function CourseContent() {


  const [searchParams] = useSearchParams();
  const { course: courseQuery } = useParams();
  const query = searchParams.get("query")?.toLowerCase();
  const queryTopic =  searchParams.get("topic")?.replaceAll("_", " ").toLowerCase() || ""
  const [markdown, setMarkdown] = useState("");
  

  // const {content,fetchContent,loading} = useSubjectContent(courseQuery,"introduction",topic);

  const { initLoading,error } = useInitCourseOutline(courseQuery, queryTopic);


  useEffect(()=>{
  
  },[courseQuery])

 
  if (initLoading) return <div className="w-full h-screen"><Loader text={`Flipping through digital pages`}/></div>;

  if(error) return <NotFound message={error}/>

  return <MarkdownToHtml />;
}
