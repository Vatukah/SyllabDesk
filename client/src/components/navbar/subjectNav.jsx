import Chapter from "./subjectNavIndexComp/chapter";
import Topic from "./subjectNavIndexComp/topic";
import { useCourseOutline } from "../../contexts/providers/CourseOutlineProvider";

export default function SubjectNav() {
  const { subject, chapters, topics, setCurrentTopic } = useCourseOutline();



  return (
    <div className="p-2 text-sm">
      <h2 className="font-bold text-center my-2 text-lg">{subject}</h2>

      {chapters.map(({ name, id }) => (
        <Chapter name={name} key={id}>
          {topics.map((t) => {
            if (t.chapter_id === id)
              return (
                <Topic
                  name={t.name}
                  handleClick={() =>
                    setCurrentTopic({ id: t.id, name: t.name })
                  }
                />
              );
          })}
        </Chapter>
      ))}
    </div>
  );
}
