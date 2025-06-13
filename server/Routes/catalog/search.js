import { Router } from "express";
import { supabaseService } from "../../supabaseClient.js";
import supabase from "../../supabaseClient.js";

const search = Router();
search.get("/:course", async (req, res) => {
  const topic = req.query.topic;
  const query = req.params.course;

  if (!query || query.length === 0)
    return res.status(400).json({ message: "Invalid search" });

  // 1. Find subjects
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .ilike("name", `%${query}%`);

  if (!courses || courses.length === 0)
    return res.status(404).json({ message: "No matching subjects found" });

  // 2. Get chapters
  const courseIds = courses.map((sub) => sub.id);
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .in("course_id", courseIds);

  const chapterId = chapters.map((ch) => ch.id);

  // 3. Get topics
  const { data: topics } = await supabase
    .from("topics")
    .select("*")
    .in("chapter_id", chapterId);

  let currentTopic = null;

  if (topic) {
    const matched = topics.find((tp) =>
      tp.name.toLowerCase().includes(topic.replaceAll("_"," ").toLowerCase())
    );
    if (matched) {
      currentTopic = { id: matched.id, name: matched.name };
    } else {
      return res.status(404).json({ message: "No matching topic found" });
    }
  } else {
    const firstTopic = topics.find((tp) => tp.topic_order === 1);
    if (firstTopic) {
      currentTopic = { id: firstTopic.id, name: firstTopic.name };
    } else {
      return res.status(404).json({ message: "No topic with order 1 found" });
    }
  }

  res.json({ course:courses[0].name,topics, chapters, currentTopic });
});

search.get("/get-note/:Id", async (req, res) => {
  const topicId = req.params.Id;

  if (!topicId) return res.json({ message: "Topic required" });

  const {
    data,
    error,
  } = await supabase.from("topics").select("*").eq("id", topicId);
 
  if (error ||data.length ===0) return res.status(500).json({ message: "No matching topic found" });

  const [{ content }] = data;
  
  res.json({ content });
});

export default search;
