import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { coursesActions } from "../../../store/ducks/courses";

const useCourseLocation = ({ courseDetails }) => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const { id: courseId } = useParams();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Courses);

  const idSearchParams = searchParams.get("lesson_id");
  let currentCourse = courses?.find((c) => c.courseId === courseId);

  const changeActiveLesson = (courseId) => {
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

      changeActiveLesson(courseId);
    }
  }, [location]);

  return { idSearchParams, currentCourse };
};

export default useCourseLocation;
