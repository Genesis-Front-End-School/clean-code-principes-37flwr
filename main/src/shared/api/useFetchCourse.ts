import {
  COURSES_FETCH_LINK,
  TOKEN_FETCH_LINK,
} from 'shared/constants/apiCallLinks';
import useSwr from 'swr';

export const useFetchCourse = (id: string) => {
  const { data: token } = useSwr({
    url: TOKEN_FETCH_LINK,
  });
  const { data: courseDetails } = useSwr(() => ({
    url: `${COURSES_FETCH_LINK}/${id}`,
    params: [['token', token.token]],
  }));

  return { courseDetails };
};
