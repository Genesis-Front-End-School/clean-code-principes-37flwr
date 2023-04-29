import React from 'react';
import { ICourseWithLessons } from '../../interfaces/Course.interface';
import Lesson from './Lesson';

interface IProps {
  courseDetails: ICourseWithLessons;
  activeLessonId: string;
  handleChange: (arg0: string) => void;
}

const Details = ({
  courseDetails,
  activeLessonId,
  handleChange,
}: IProps): JSX.Element => {
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

export default Details;
