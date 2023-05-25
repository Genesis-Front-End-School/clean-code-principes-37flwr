import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COURSES_PER_PAGE } from 'shared/constants/pagination';
import { ICourse } from 'shared/interfaces/Course.interface';

const usePagination = (courses: Array<ICourse>) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentPage = parseInt(searchParams.get('page') ?? '1');

  const currentCourses = useMemo(() => {
    const idxOfLastCourse = currentPage * COURSES_PER_PAGE;
    const idxOfFirstCourse = idxOfLastCourse - COURSES_PER_PAGE;
    return courses.slice(idxOfFirstCourse, idxOfLastCourse);
  }, [courses, currentPage]);

  const paginate = (number: number) => {
    setSearchParams(`page=${number}`);
  };
  return { currentCourses, currentPage, paginate };
};

export default usePagination;
