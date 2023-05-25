import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import toast from 'react-hot-toast';
import Hls from 'hls.js';

import PipProvider from '../PipProvider';

import { HOTKEY_PARAMS } from 'shared/constants/hotkeys';

// External dependencies mocks
var mockDispatch = jest.fn();

jest.mock('hls.js');
jest.mock('react-hot-toast');
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const mockHandleOnClose = jest.fn();
const mockVideoState = {
  courseId: 'video-id',
  link: 'video-link',
  lessonId: 'lesson-id',
  autoplay: true,
  timing: 12,
  handleOnClose: mockHandleOnClose,
};

describe('Pip provider', () => {
  const mockToastSuccess = jest.fn();
  const setState = jest.fn();
  beforeEach(() => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [mockVideoState, setState]);

    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    jest.spyOn(Hls, 'isSupported').mockImplementation(() => true);

    jest
      .spyOn(HTMLVideoElement.prototype, 'play')
      .mockResolvedValueOnce(Promise.resolve());

    jest
      .spyOn(HTMLVideoElement.prototype, 'playbackRate', 'get')
      .mockReturnValue(1);

    jest.spyOn(toast, 'success').mockImplementationOnce(mockToastSuccess);
  });

  it('should render pip provider', () => {
    const { container } = render(<PipProvider />);
    expect(container).toBeInTheDocument();
  });

  it('should change playback speed on hotkey click', () => {
    const { container } = render(<PipProvider />);

    fireEvent.keyDown(container, { key: HOTKEY_PARAMS[0].key, ctrlKey: true });

    expect(mockToastSuccess).toHaveBeenCalledWith(
      `Playback speed changed to ${HOTKEY_PARAMS[0].action}x`,
      { duration: 2000 }
    );
  });

  it('should update pip on button click', () => {
    render(<PipProvider />);

    fireEvent.click(screen.getByTestId('update-pip-btn'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        courseId: mockVideoState.courseId,
        lessonId: mockVideoState.lessonId,
        timing: mockVideoState.timing,
      },
      type: 'app/courses/CHANGE_PROGRESS',
    });
    expect(mockHandleOnClose).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(null);
  });
});
