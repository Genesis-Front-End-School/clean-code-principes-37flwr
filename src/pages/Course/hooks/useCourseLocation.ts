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
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.Courses);

  const idSearchParams = searchParams.get('lesson_id');
  let currentCourse: ReduxCourse = courses?.find(
    (c: ReduxCourse) => c.courseId === id
  );

  useEffect(() => {
    if (courseDetails) {
      if (!idSearchParams) {
        if (currentCourse) {
          setSearchParams(`lesson_id=${currentCourse.activeLessonId}`);
        } else {
          if (id)
            dispatch(
              coursesActions.changeActiveLesson({
                courseId: id,
                activeLessonId: courseDetails.lessons[0].id,
              })
            );
          setSearchParams(`lesson_id=${courseDetails.lessons[0].id}`);
        }
      } else {
        if (currentCourse.activeLessonId !== searchParams.get('lesson_id')) {
          const activeLessonId = searchParams.get('lesson_id');
          if (id && activeLessonId)
            dispatch(
              coursesActions.changeActiveLesson({
                courseId: id,
                activeLessonId,
              })
            );
        }
      }
    }
    // eslint-disable-next-line
  }, [location]);

  return { idSearchParams, currentCourse };
};

export default useCourseLocation;
