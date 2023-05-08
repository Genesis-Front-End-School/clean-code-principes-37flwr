import React from 'react';
import { render, screen } from '@testing-library/react';
import Hls from 'hls.js';
import Video from '../Video';

jest.mock('hls.js');

const videoPreview = {
  duration: 2,
  link: 'test-link',
  previewImageLink: 'preview-link',
};

describe('Video component', () => {
  beforeEach(() => {
    const spyIsSupported = jest.spyOn(Hls, 'isSupported');
    spyIsSupported.mockImplementation(() => true);
  });

  it('should return video if isHovering is set to true', () => {
    render(<Video isHovering={true} videoPreview={videoPreview} />);

    expect(screen.getByTestId('video-hover')).toBeInTheDocument();
  });

  it('should return image if isHovering is set to false', () => {
    render(<Video isHovering={false} videoPreview={videoPreview} />);

    expect(screen.getByTestId('preview-img')).toBeInTheDocument();
  });

  it('should return placeholder image if isHovering is set to false and no previewImg link is provided', () => {
    render(
      <Video
        isHovering={false}
        videoPreview={{ ...videoPreview, previewImageLink: '' }}
      />
    );

    expect(screen.getByTestId('placeholder-preview-img')).toBeInTheDocument();
  });

  it('should not set hls if not all needed params are provided', () => {
    const spyIsSupported = jest.spyOn(Hls, 'isSupported');
    spyIsSupported.mockImplementation(() => false);
    render(
      <Video
        isHovering={false}
        videoPreview={{ ...videoPreview, previewImageLink: '' }}
      />
    );

    expect(Hls).not.toHaveBeenCalled();
  });
});
