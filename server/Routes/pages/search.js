import { Router } from "express";
import {supabaseService} from "../../services/supabaseClient.js";

const search = Router();

search.get('/:subject',async (req,res)=>{

const { topic } = req.query;
const query = req.params.subject;

if(!query || query.length ===0) return res.status(400).json({message:"invalid search"});

// 1. Find courses matching the query
const { data: subjects } = await supabaseService
  .from("subjects")
  .select("*")
  .ilike("name", `%${query}%`);

  

// Get course IDs for topic search
const courseIds = subjects.map((sub) => sub.id);

// 2. Find topics within those courses
const { data: chapters } = await supabaseService
  .from("chapters")
  .select("*")
  .in("subject_id", courseIds);

const chapterId = chapters.map((ch)=> ch.id)

const { data: topics } = await supabaseService
  .from("topics")
  .select("*")
  .in("chapter_id", chapterId);

  const [content] = topics.map((tp)=> tp.name === topic)
  const {markdown} = content;
res.json({ subjects, topics ,chapters,markdown});
});

export default search;