import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore, { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';

import Course from '.';

import { mockCourse, mockInitialState } from 'shared/mocks/course';

// External dependencies mocks
var mockSetSearchParams = jest.fn();
var mockUseParams: string;

jest.mock('swr', () => () => mockCourse);
jest.mock('react-router-dom', () => ({
  useParams: () => ({
    id: mockUseParams,
  }),
  useSearchParams: () => [{}, mockSetSearchParams],
}));

// Local dependencies mocks
var mockDispatch = jest.fn();
var mockUseCourseLocation: IUseCourseLocation;

jest.mock('store/hooks', () => ({
  useAppSelector: () => mockInitialState,
  useAppDispatch: () => mockDispatch,
}));
jest.mock('features/useCourseLocation', () => ({
  _esModule: true,
  useCourseLocation: () => mockUseCourseLocation,
}));

interface IUseCourseLocation {
  idSearchParams: string | null;
  currentCourse: {
    activeLessonId: string | null;
    courseId: string | null;
    progress: Array<{
      lessonId: string | null;
      timing: number | null;
    }> | null;
  } | null;
}

describe('Course page', () => {
  let store: MockStore;
  beforeEach(() => {
    jest.resetAllMocks();
    mockUseCourseLocation = {
      idSearchParams: '278e5a0e-8df1-4646-9984-10289d52dc2d',
      currentCourse: {
        activeLessonId: '278e5a0e-8df1-4646-9984-10289d52dc2d',
        courseId: '352be3c6-848b-4c19-9e7d-54fe68fef183',
        progress: [
          {
            lessonId: '278e5a0e-8df1-4646-9984-10289d52dc2d',
            timing: 4.116125,
          },
        ],
      },
    };
    mockUseParams = 'course-id';
    const mockStore = configureStore();
    store = mockStore(mockInitialState);
  });

  describe('Course lessons', () => {
    it('should render course lessons', () => {
      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(screen.getByTestId('course-lessons')).toBeInTheDocument();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should render course title', () => {
      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(
        screen.getByText(/Lack of Motivation & How to Overcome It/)
      ).toBeInTheDocument();
    });

    it('should not set lesson id to search params if idSearchParams is provided', () => {
      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(mockSetSearchParams).toHaveBeenCalledTimes(0);
    });

    it('should set lesson id to search params if there is no idSearchParams provided', () => {
      mockUseCourseLocation = {
        ...mockUseCourseLocation,
        idSearchParams: null,
      };

      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    });

    it('should change lesson on lesson click', () => {
      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );
      fireEvent.click(screen.getByTestId('change-lesson-btn'));

      // First dispatch - for initializing a new course in redux store
      // Second one - on handling lesson change
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    });

    it('should not change lesson on lesson click if there is no id, idSearchParams and videoRef', () => {
      mockUseParams = '';
      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      fireEvent.click(screen.getByTestId('change-lesson-btn'));

      expect(mockDispatch).toHaveBeenCalledTimes(0);
      expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    });

    it('should not render course lessons if no idSearchParams is provided', () => {
      mockUseCourseLocation = {
        ...mockUseCourseLocation,
        idSearchParams: null,
      };

      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(screen.queryByTestId('course-lessons')).not.toBeInTheDocument();
    });

    it('should set search params equal to first lesson if no idSearchParams and currentCourse provided', () => {
      mockUseCourseLocation = {
        ...mockUseCourseLocation,
        idSearchParams: null,
        currentCourse: null,
      };

      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(mockSetSearchParams).toHaveBeenCalledWith(
        `lesson_id=${mockCourse.data.lessons[0].id}`
      );
    });

    it('should set search params equal to currentCourse.activeLessonId if no idSearchParams provided', () => {
      mockUseCourseLocation = {
        ...mockUseCourseLocation,
        idSearchParams: null,
      };

      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(mockSetSearchParams).toHaveBeenCalledWith(
        `lesson_id=${mockUseCourseLocation?.currentCourse?.activeLessonId}`
      );
    });

    it('should not set new course to redux store if no id is found in useParams', () => {
      mockUseParams = '';

      render(
        <Provider store={store}>
          <Course />
        </Provider>
      );

      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });
});
