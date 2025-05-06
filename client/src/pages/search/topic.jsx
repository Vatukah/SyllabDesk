import { useParams } from "react-router";

export default function TopicPage() {
  const { subjectSlug, chapterSlug, topicSlug } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold capitalize">{topicSlug.replace(/-/g, " ")}</h2>
      <p className="text-gray-700 mt-2">
        Content for <strong>{topicSlug}</strong> under chapter <strong>{chapterSlug}</strong> of subject <strong>{subjectSlug}</strong>.
      </p>

      {/* 🔽 You can fetch and render real content here if available */}
    </div>
  );
}
