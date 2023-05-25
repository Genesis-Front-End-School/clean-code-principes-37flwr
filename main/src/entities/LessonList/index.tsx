import React, { FC } from 'react';
import Lesson from 'entities/Lesson';
import { ICourseWithLessons } from 'shared/interfaces/Course.interface';

interface ILessonListProps {
  courseDetails: ICourseWithLessons;
  activeLessonId: string;
  handleChange: (arg0: string) => void;
}

const LessonList: FC<ILessonListProps> = ({
  courseDetails,
  activeLessonId,
  handleChange,
}) => {
  return (
    <>
      {courseDetails.lessons
        ?.sort((a, b) => a.order - b.order)
        .map((lesson, idx) => (
          <Lesson
            data={lesson}
            key={idx}
            activeLesson={activeLessonId}
            handleClick={handleChange}
          />
        ))}
    </>
  );
};

export default LessonList;
