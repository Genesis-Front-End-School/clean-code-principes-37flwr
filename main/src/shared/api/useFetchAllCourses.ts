import {
  COURSES_FETCH_LINK,
  TOKEN_FETCH_LINK,
} from 'shared/constants/apiCallLinks';
import useSwr from 'swr';

export const useFetchAllCourses = () => {
  const { data: token } = useSwr({
    url: TOKEN_FETCH_LINK,
  });
  const { data: courses } = useSwr(() => ({
    url: COURSES_FETCH_LINK,
    params: [['token', token.token]],
  }));

  return { courses };
};
