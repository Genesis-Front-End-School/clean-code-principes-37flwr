import { renderHook } from '@testing-library/react';

import { useCourseLocation } from './useCourseLocation';

import { mockCourseWithLessons, mockInitialState } from '../../../mocks/course';

// External dependencies mocks
var mockSetSearchParams = jest.fn();
var mockUseParams: string;
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useParams: () => ({
    id: mockUseParams,
  }),
  useSearchParams: () => [
    new URLSearchParams({ lesson_id: '1234' }),
    mockSetSearchParams,
  ],
  useLocation: jest.fn(),
}));

// Local dependencies mocks
var mockDispatch = jest.fn();
jest.mock('../../../store/hooks', () => ({
  useAppSelector: () => mockInitialState,
  useAppDispatch: () => mockDispatch,
}));

describe('useCourseLocation hook', () => {
  beforeEach(() => {
    mockUseParams = '352be3c6-848b-4c19-9e7d-54fe68fef183';
  });

  it('should dispatch change active lesson', () => {
    renderHook(() =>
      useCourseLocation({
        courseDetails: mockCourseWithLessons,
      })
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        courseId: mockUseParams,
        activeLessonId: '1234',
      },
      type: 'app/courses/CHANGE_ACTIVE_LESSON',
    });
  });

  it('should setSearchParams equal to lessons[0].id', () => {
    mockUseParams = 'intentionally set to fail';
    renderHook(() =>
      useCourseLocation({
        courseDetails: mockCourseWithLessons,
      })
    );

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      `lesson_id=${mockCourseWithLessons.lessons[0].id}`
    );
  });

  it('should setSearchParams equal to activeLessonId', () => {
    renderHook(() =>
      useCourseLocation({
        courseDetails: {
          ...mockCourseWithLessons,
          lessons: [
            {
              id: '278e5a0e-8df1-4646-9984-10289d52dc2d',
              order: 1,
              status: 'unlocked',
              title: 'title-1',
              type: 'video',
              duration: 32,
              link: 'link-1',
              previewImageLink: 'link-img-1',
            },
          ],
        },
      })
    );

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      `lesson_id=${mockInitialState.courses[0].activeLessonId}`
    );
  });
});
