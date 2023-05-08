import React from 'react';
import { render, screen } from '@testing-library/react';

import CoursesList from '../CoursesList';

import { mockInitialState } from '../../../mocks/course';

const mockCourse = {
  data: {
    courses: [
      {
        containsLockedLessons: false,
        description: 'test-description',
        duration: 123,
        id: '1',
        launchDate: '',
        lessonsCount: 3,
        meta: {
          courseVideoPreview: {
            duration: 12,
            link: 'link-1',
            previewImageLink: 'preview-1',
          },
          skills: ['skill-1', 'skill-2'],
          slug: 'slug',
        },
        previewImageLink: 'preview-img-1',
        rating: 4,
        status: 'status',
        tags: ['tag-1', 'tag-2'],
        title: 'title-1',
      },
    ],
  },
};

// External dependencies mocks
const mockSetSearchParams = jest.fn();
jest.mock('swr', () => () => mockCourse);
jest.mock('react-router-dom', () => ({
  useSearchParams: () => [{ get: () => '1' }, mockSetSearchParams],
  useNavigate: () => jest.fn(),
}));

// Local dependencies mocks
const mockDispatch = jest.fn();
jest.mock('../../../store/hooks', () => ({
  useAppSelector: () => mockInitialState,
  useAppDispatch: () => mockDispatch,
}));

describe('Course list component', () => {
  it('should render courses list', () => {
    render(<CoursesList />);

    expect(screen.getByTestId('courses-list')).toBeInTheDocument();
  });
});
