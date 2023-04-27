import Hls from "hls.js";
import React, { useRef } from "react";
import ImageNotFound from "../../assets/not-found-img.png";

const CourseCardVideo = ({ isHovering, videoPreview }) => {
  const previewImageLink = videoPreview?.previewImageLink;
  const videoRef = useRef();

  if (Hls.isSupported() && videoPreview) {
    var hls = new Hls();
    hls.loadSource(videoPreview.link);
    hls.attachMedia(videoRef.current);
  }

  if (isHovering) {
    return (
      <video
        autoPlay
        controls={false}
        ref={videoRef}
        className="courses-list__card__video"
        muted
      ></video>
    );
  }

  return previewImageLink ? (
    <picture>
      <source
        srcSet={previewImageLink.replace("preview", "") + "cover.webp"}
        type="image/webp"
      />
      <img className="courses-list__card__img" src={ImageNotFound} alt="" />
    </picture>
  ) : (
    <img className="courses-list__card__img" src={ImageNotFound} alt="" />
  );
};

export default CourseCardVideo;
