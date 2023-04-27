import { useSearchParams } from "react-router-dom";
import { COURSES_PER_PAGE } from "../../../constants/Pagination";

const usePagination = (courses) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentPage = searchParams.get("page");
  if (!currentPage) {
    currentPage = 1;
  }

  const idxOfLastCourse = currentPage * COURSES_PER_PAGE;
  const idxOfFirstCourse = idxOfLastCourse - COURSES_PER_PAGE;
  const currentCourses = courses?.courses.slice(
    idxOfFirstCourse,
    idxOfLastCourse
  );

  const paginate = (number) => {
    setSearchParams(`page=${number}`);
  };
  return { currentCourses, currentPage, paginate };
};

export default usePagination;
