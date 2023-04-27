import useSwr from 'swr';
import {
  COURSES_FETCH_LINK,
  TOKEN_FETCH_LINK,
} from '../../constants/apiCallLinks';
import { COURSES_PER_PAGE } from '../../constants/pagination';
import BasicPagination from '../../components/BasicPagination';
import CourseCard from './CourseCard';
import usePagination from './hooks/usePagination';
import { Course } from './Course.type';

const CoursesList = () => {
  const { data: token } = useSwr({
    url: TOKEN_FETCH_LINK,
  });
  const { data: courses } = useSwr(() => ({
    url: COURSES_FETCH_LINK,
    params: [['token', token.token]],
  }));

  const { currentCourses, currentPage, paginate } = usePagination(
    courses.courses
  );

  return (
    <>
      <section className="courses-list--container">
        {currentCourses?.map((course: Course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </section>
      <BasicPagination
        elementsPerPage={COURSES_PER_PAGE}
        totalElements={courses.courses.length}
        paginate={paginate}
        activePage={currentPage}
      />
    </>
  );
};

export default CoursesList;
