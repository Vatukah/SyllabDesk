import { Router } from "express";
import { supabaseService } from "../../services/supabaseClient.js";
import supabase from "../../services/supabaseClient.js";

const search = Router();
search.get("/:subject", async (req, res) => {
  const topic = req.query.topic;
  const query = req.params.subject;

  if (!query || query.length === 0)
    return res.status(400).json({ message: "Invalid search" });

  // 1. Find subjects
  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .ilike("name", `%${query}%`);

  if (!subjects || subjects.length === 0)
    return res.status(404).json({ message: "No matching subjects found" });

  // 2. Get chapters
  const subjectIds = subjects.map((sub) => sub.id);
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .in("subject_id", subjectIds);

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

  res.json({ subject:subjects[0].name,topics, chapters, currentTopic });
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
