import React from 'react';
import { renderHook } from '@testing-library/react';

import usePagination from '../usePagination';

// External dependencies mocks
var mockCurrentPage: { get: () => number | null };
const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  useSearchParams: () => [mockCurrentPage, mockSetSearchParams],
}));

// Local dependencies mocks
jest.mock('shared/constants/pagination', () => ({
  COURSES_PER_PAGE: 2,
}));

const mockCourse = [
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
  {
    containsLockedLessons: false,
    description: 'test-description-2',
    duration: 124,
    id: '2',
    launchDate: '',
    lessonsCount: 2,
    meta: {
      courseVideoPreview: {
        duration: 13,
        link: 'link-2',
        previewImageLink: 'preview-2',
      },
      skills: ['skill-3', 'skill-4'],
      slug: 'slug-2',
    },
    previewImageLink: 'preview-img-2',
    rating: 4.5,
    status: 'status',
    tags: ['tag-3', 'tag-4'],
    title: 'title-2',
  },
  {
    containsLockedLessons: false,
    description: 'test-description-3',
    duration: 124,
    id: '3',
    launchDate: '',
    lessonsCount: 2,
    meta: {
      courseVideoPreview: {
        duration: 13,
        link: 'link-2',
        previewImageLink: 'preview-2',
      },
      skills: ['skill-3', 'skill-4'],
      slug: 'slug-2',
    },
    previewImageLink: 'preview-img-2',
    rating: 4.5,
    status: 'status',
    tags: ['tag-3', 'tag-4'],
    title: 'title-2',
  },
];

describe('usePagination hook', () => {
  beforeEach(() => {
    mockCurrentPage = { get: () => 1 };
  });

  it('should return two courses', () => {
    const { result } = renderHook(() => usePagination(mockCourse));

    expect(result.current.currentCourses).toHaveLength(2);
  });

  it('should return one course', () => {
    mockCurrentPage = { get: () => 2 };
    const { result } = renderHook(() => usePagination(mockCourse));

    expect(result.current.currentCourses).toHaveLength(1);
  });

  it('should update search params on paginate call', () => {
    const { result } = renderHook(() => usePagination(mockCourse));

    result.current.paginate(1000);
    expect(mockSetSearchParams).toHaveBeenCalledWith('page=1000');
  });

  it('should return two courses if no page is provided', () => {
    mockCurrentPage = { get: () => null };
    const { result } = renderHook(() => usePagination(mockCourse));

    expect(result.current.currentCourses).toHaveLength(2);
  });
});
