import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { coursesActions } from "../../../store/ducks/courses";

const useCourseLocation = ({ courseDetails }) => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Courses);

  const idSearchParams = searchParams.get("lesson_id");
  let currentCourse = courses?.find((c) => c.courseId === id);

  useEffect(() => {
    if (courseDetails) {
      if (!idSearchParams) {
        if (currentCourse) {
          setSearchParams(`lesson_id=${currentCourse.activeLessonId}`);
        } else {
          dispatch(
            coursesActions.changeActiveLesson({
              courseId: id,
              activeLessonId: courseDetails.lessons[0].id,
            })
          );
          setSearchParams(`lesson_id=${courseDetails.lessons[0].id}`);
        }
      } else {
        if (currentCourse.activeLessonId !== searchParams.get("lesson_id")) {
          dispatch(
            coursesActions.changeActiveLesson({
              courseId: id,
              activeLessonId: searchParams.get("lesson_id"),
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
