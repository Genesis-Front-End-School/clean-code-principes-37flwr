import useSwr from "swr";
import {
  COURSES_FETCH_LINK,
  TOKEN_FETCH_LINK,
} from "../../constants/ApiCallLinks";
import { COURSES_PER_PAGE } from "../../constants/Pagination";
import BasicPagination from "../../components/BasicPagination";
import CourseCard from "./CourseCard";
import usePagination from "./hooks/usePagination";

const CoursesList = () => {
  const { data: token } = useSwr({
    url: TOKEN_FETCH_LINK,
  });
  const { data: courses } = useSwr(() => ({
    url: COURSES_FETCH_LINK,
    params: [["token", token.token]],
  }));

  const { currentCourses, currentPage, paginate } = usePagination(courses);

  return (
    <>
      <section className="courses-list--container">
        {currentCourses?.map((course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </section>
      <BasicPagination
        elementsPerPage={COURSES_PER_PAGE}
        totalElements={courses.courses.length}
        paginate={paginate}
        active={currentPage}
      />
    </>
  );
};

export default CoursesList;
