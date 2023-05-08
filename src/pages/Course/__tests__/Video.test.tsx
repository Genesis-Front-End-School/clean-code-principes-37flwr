import React, { createRef, RefObject } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore, { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import toast from 'react-hot-toast';
import Hls from 'hls.js';

import Video from '../Video';

import { mockCourseWithLessons, mockInitialState } from '../../../mocks/course';
import types from '../../../store/ducks/courses/actionTypes';
import { HOTKEY_PARAMS } from '../../../constants/hotkeys';

// External dependencies mocks
var mockSetState = jest.fn();
var mockSetSearchParams = jest.fn();
var mockUseParams: string;

jest.mock('hls.js');
jest.mock('react-hot-toast');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial: any) => [initial, mockSetState],
}));
jest.mock('react-router-dom', () => ({
  useParams: () => ({
    id: mockUseParams,
  }),
  useSearchParams: () => [{ get: () => 'lesson-id' }, mockSetSearchParams],
}));

// Local dependencies mock
var mockUsePip = jest.fn();
var mockDispatch = jest.fn();

jest.mock('../../../hooks', () => ({
  usePip: () => mockUsePip,
}));
jest.mock('../../../store/hooks', () => ({
  useAppSelector: () => mockInitialState,
  useAppDispatch: () => mockDispatch,
}));

describe('Video element', () => {
  const mockToastSuccess = jest.fn();

  const mockStore = configureStore();
  let store: MockStore;
  let lessonIdRef: RefObject<string>;
  let videoRef: RefObject<HTMLVideoElement>;

  beforeEach(() => {
    store = mockStore(mockInitialState);
    mockUseParams = '352be3c6-848b-4c19-9e7d-54fe68fef183';
    lessonIdRef = createRef<string>();
    lessonIdRef.current = '1';
    videoRef = createRef<HTMLVideoElement>();

    const spyToastSuccess = jest.spyOn(toast, 'success');
    spyToastSuccess.mockImplementationOnce(mockToastSuccess);

    const spyIsSupported = jest.spyOn(Hls, 'isSupported');
    spyIsSupported.mockImplementation(() => true);
  });

  it('should render video element', () => {
    render(
      <Provider store={store}>
        <Video
          activeLessonId="278e5a0e-8df1-4646-9984-10289d52dc2d"
          courseDetails={mockCourseWithLessons}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
      </Provider>
    );
    expect(screen.getByTestId('video-element')).toBeInTheDocument();
  });

  it('should create new Hls instance', () => {
    videoRef.current = {
      onplay: jest.fn(),
    };
    render(
      <Provider store={store}>
        <Video
          activeLessonId="278e5a0e-8df1-4646-9984-10289d52dc2d"
          courseDetails={mockCourseWithLessons}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
      </Provider>
    );

    // video component changes onplay function on the component level
    // here it equals null because it sets it to jest.fn()
    expect(videoRef.current?.onplay).toEqual(null);
  });

  it('should assign timing to video ref', () => {
    render(
      <Provider store={store}>
        <Video
          activeLessonId="278e5a0e-8df1-4646-9984-10289d52dc2d"
          courseDetails={mockCourseWithLessons}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
      </Provider>
    );
    const timing = mockInitialState.courses[0].progress[0].timing;
    expect(videoRef.current?.currentTime).toEqual(timing);
  });

  it('should change playback speed on keyboard action', () => {
    const { container } = render(
      <Provider store={store}>
        <Video
          activeLessonId="278e5a0e-8df1-4646-9984-10289d52dc2d"
          courseDetails={mockCourseWithLessons}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
      </Provider>
    );

    fireEvent.keyDown(container, {
      key: HOTKEY_PARAMS[0].key,
      ctrlKey: true,
    });

    const newSpeed = HOTKEY_PARAMS.find((h) => h.key === '1')?.action;
    expect(mockToastSuccess).toHaveBeenCalledWith(
      `Playback speed changed to ${newSpeed}x`,
      { duration: 2000 }
    );
  });

  it('should move video to pip on button click and dispatch an action to save progress', () => {
    render(
      <Provider store={store}>
        <Video
          activeLessonId="278e5a0e-8df1-4646-9984-10289d52dc2d"
          courseDetails={mockCourseWithLessons}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('move-to-pip-btn'));

    const timing = mockInitialState.courses[0].progress[0].timing;
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        courseId: mockUseParams,
        lessonId: 'lesson-id',
        timing,
      },
      type: types.CHANGE_PROGRESS,
    });

    expect(mockUsePip).toHaveBeenCalledTimes(1);
  });

  it('should set linkPresent state to false if there is no link found', () => {
    lessonIdRef.current = 'no such link present';
    videoRef.current = {
      onplay: jest.fn(),
    };
    render(
      <Provider store={store}>
        <Video
          activeLessonId="278e5a0e-8df1-4646-9984-10289d52dc2d"
          courseDetails={mockCourseWithLessons}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
      </Provider>
    );

    expect(mockSetState).toHaveBeenCalledWith(false);
  });
});
