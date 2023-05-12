import usePagination from 'features/usePagination';
import CourseCard from 'entities/CourseCard';
import { useFetchAllCourses } from 'shared/api/useFetchAllCourses';
import BasicPagination from 'shared/ui/BasicPagination';
import { COURSES_PER_PAGE } from 'shared/constants/pagination';
import { ICourse } from 'shared/interfaces/Course.interface';
import './styles.scss';

const CoursesList = () => {
  const { courses } = useFetchAllCourses();

  const { currentCourses, currentPage, paginate } = usePagination(
    courses.courses
  );

  return (
    <>
      <section className="courses-list--container" data-testid="courses-list">
        {currentCourses?.map((course: ICourse) => (
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
