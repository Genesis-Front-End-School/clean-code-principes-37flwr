import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import PlaybackSpeed from '../PlaybackSpeed';

import { HOTKEY_PARAMS } from '../../../constants/hotkeys';

describe('PlaybackSpeed component', () => {
  it(`should render ${HOTKEY_PARAMS.length} playback speed options`, () => {
    render(<PlaybackSpeed params={HOTKEY_PARAMS} />);

    expect(screen.getAllByTestId('playback-speed-option')).toHaveLength(
      HOTKEY_PARAMS.length
    );
  });

  it('should dispatch a keyboard event on button click', () => {
    render(<PlaybackSpeed params={HOTKEY_PARAMS} />);
    const mockKeyboard = jest.fn();
    window.addEventListener('keydown', mockKeyboard);
    fireEvent.click(screen.getAllByTestId('playback-speed-btn')[0]);

    expect(mockKeyboard).toHaveBeenCalledTimes(1);
    expect(mockKeyboard).toHaveBeenCalledWith(
      new KeyboardEvent('keydown', { key: HOTKEY_PARAMS[0].key, ctrlKey: true })
    );
  });
});
