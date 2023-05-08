import Hls from 'hls.js';
import React, { useRef } from 'react';
import ImageNotFound from '../../../assets/not-found-img.png';
import { ICourseVideoPreview } from '../../../interfaces/Course.interface';

interface IVideoProps {
  isHovering: boolean;
  videoPreview: ICourseVideoPreview;
}

const Video = ({ isHovering, videoPreview }: IVideoProps) => {
  const previewImageLink = videoPreview?.previewImageLink;
  const videoRef = useRef<HTMLVideoElement>(null);

  if (Hls.isSupported() && videoPreview) {
    var hls = new Hls();
    hls.loadSource(videoPreview.link);
    hls.attachMedia(videoRef.current!);
  }

  if (isHovering) {
    return (
      <video
        data-testid="video-hover"
        autoPlay
        controls={false}
        ref={videoRef}
        className="courses-list__card__video"
        muted
      ></video>
    );
  }

  return previewImageLink ? (
    <picture data-testid="preview-img">
      <source
        srcSet={previewImageLink.replace('preview', '') + 'cover.webp'}
        type="image/webp"
      />
      <img className="courses-list__card__img" src={ImageNotFound} alt="" />
    </picture>
  ) : (
    <img
      data-testid="placeholder-preview-img"
      className="courses-list__card__img"
      src={ImageNotFound}
      alt=""
    />
  );
};

export default Video;
