import { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { coursesActions } from '../../../store/ducks/courses';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ICourseWithLessons } from '../../../interfaces/Course.interface';
import { ReduxCourse } from '../../../interfaces/ReduxCourses.interface';

interface IProps {
  courseDetails: ICourseWithLessons;
}

const useCourseLocation = ({ courseDetails }: IProps) => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const { id: courseId } = useParams();

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.Courses);

  const idSearchParams = searchParams.get('lesson_id')!;
  let currentCourse: ReduxCourse = courses?.find(
    (c: ReduxCourse) => c.courseId === courseId
  );

  const changeActiveLesson = (courseId: string) => {
    dispatch(
      coursesActions.changeActiveLesson({
        courseId: courseId,
        activeLessonId: idSearchParams,
      })
    );
  };

  useEffect(() => {
    if (courseDetails) {
      if (currentCourse) {
        setSearchParams(`lesson_id=${currentCourse.activeLessonId}`);
      } else {
        setSearchParams(`lesson_id=${courseDetails.lessons[0].id}`);
      }

      courseId && changeActiveLesson(courseId);
    }
  }, [location]);

  return { idSearchParams, currentCourse };
};

export default useCourseLocation;
