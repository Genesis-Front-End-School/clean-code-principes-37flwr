import React from "react";
import Lesson from "./Lesson";

const Details = ({ courseDetails, activeLessonId, handleChange }) => {
  return courseDetails.lessons
    ?.sort((a, b) => a.order - b.order)
    .map((lesson, idx) => (
      <Lesson
        data={lesson}
        key={idx}
        activeLesson={activeLessonId}
        handleClick={handleChange}
      />
    ));
};

export default Details;
