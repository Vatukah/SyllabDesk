import { useSearch } from "../../contexts/searchContext/searchProvider";
import { Link, NavLink } from "react-router"; // If using React Router

export default function SubjectNav() {
  const { subject, chapters, topics, loading } = useSearch();

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (!subject?.length) return <div className="p-4 text-red-500">No subjects found.</div>;

  const structuredNav = subject.map((subj) => {
    const subjectChapters = chapters
      .filter((ch) => ch.subject_id === subj.id)
      .map((chapter) => {
        const chapterTopics = topics
          .filter((tp) => tp.chapter_id === chapter.id)
          .map((tp) => ({
            id: tp.id,
            name: tp.name
          }));
        return {
          id: chapter.id,
          name: chapter.name,
          topics: chapterTopics
        };
      });

    return {
      subject: { id: subj.id, name: subj.name },
      chapters: subjectChapters
    };
  });

  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="p-4 font-mono text-sm">
      {structuredNav.map(({ subject, chapters }) => (
        <div key={subject.id}>
          <div className="font-bold">{subject.name}</div>
          {chapters.map((chapter) => (
            <div key={chapter.id} className="pl-4">
              └─ {chapter.name}
              {chapter.topics.map((topic) => (
                <div key={topic.id} className="pl-6">
                  └─{" "}
                  <NavLink
                    to={`/subject/${slugify(subject.name)}/chapter/${slugify(chapter.name)}/topic/${slugify(topic.name)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {topic.name}
                  </NavLink>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
