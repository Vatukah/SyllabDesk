import { v4 as uuidv4 } from "uuid";

export const initialCourseFormState = {
  course: {
    name: "",
    chapters: []
  },
  currentChapter: null
};

export function courseFormReducer(state, action) {
  switch (action.type) {
    case "SET_COURSE":
      return {
        ...state,
        course: {...state.course,...action.payload},
      };

    case "SET_CURRENT_CHAPTER":
      return {
        ...state,
        currentChapter: action.payload,
      };

    case "ADD_CHAPTER": {
      const newChapter = {
        ...action.payload,
        id: uuidv4(),
        topics: []
      };
      return {
        ...state,
        course: {
          ...state.course,
          chapters: [...state.course.chapters, newChapter],
        },
        currentChapter: newChapter.id,
      };
    }

    case "UPDATE_CHAPTER":
      return {
        ...state,
        course: {
          ...state.course,
          chapters: state.course.chapters.map((chapter) =>
            chapter.id === action.payload.id
              ? { ...chapter, ...action.payload }
              : chapter
          ),
        },
      };

    case "ADD_TOPIC": {
      const newTopic = {
        ...action.payload.topic,
        id: uuidv4()
      };
      return {
        ...state,
        course: {
          ...state.course,
          chapters: state.course.chapters.map((chapter) =>
            chapter.id === action.payload.chapterId
              ? {
                  ...chapter,
                  topics: [...(chapter.topics || []), newTopic],
                }
              : chapter
          ),
        },
      };
    }

    case "REORDER_CHAPTERS":
      return {
        ...state,
        course: {
          ...state.course,
          chapters: action.payload,
        },
      };

    case "REORDER_TOPICS":
      return {
        ...state,
        course: {
          ...state.course,
          chapters: state.course.chapters.map((chapter) =>
            chapter.id === action.payload.chapterId
              ? {
                  ...chapter,
                  topics: action.payload.topics,
                }
              : chapter
          ),
        },
      };

    default:
      return state;
  }
}
