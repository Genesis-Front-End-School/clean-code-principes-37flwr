import { useSearchParams } from 'react-router-dom';
import { COURSES_PER_PAGE } from '../../../constants/pagination';
import { ICourse } from '../../../interfaces/Course.interface';

const usePagination = (courses: Array<ICourse>) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentPage = parseInt(searchParams.get('page') ?? '1');

  const idxOfLastCourse = currentPage * COURSES_PER_PAGE;
  const idxOfFirstCourse = idxOfLastCourse - COURSES_PER_PAGE;
  const currentCourses = courses.slice(idxOfFirstCourse, idxOfLastCourse);

  const paginate = (number: number) => {
    setSearchParams(`page=${number}`);
  };
  return { currentCourses, currentPage, paginate };
};

export default usePagination;
