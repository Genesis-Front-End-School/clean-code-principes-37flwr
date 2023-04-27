import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Hls from "hls.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { hotkeysParams } from "../../schemes/hotkeysParams";
import { coursesActions } from "../../store/ducks/courses";
import { usePip } from "../../hooks";
import { Button } from "react-bootstrap";

const Video = ({ activeLessonId, courseDetails, lessonIdRef, videoRef }) => {
  const [openedInPip, setOpenedInPip] = useState(false);
  const [videoLinkPresent, setVideoLinkPresent] = useState(true);
  let [searchParams, _] = useSearchParams();

  const { id } = useParams();
  const { updatePip } = usePip();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Courses);

  // Set video timing to be equal to stored value
  useEffect(() => {
    const timing = courses
      .find((c) => c.courseId === id)
      ?.progress?.find((p) => p.lessonId === activeLessonId)?.timing;
    if (timing) {
      videoRef.current.currentTime = timing;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLessonId]);

  // Handle hotkeys for playback speed
  useEffect(() => {
    const handlePlaybackChange = (event) => {
      const newPlaybackSpeed = hotkeysParams.find(
        (h) => h.key === event.key
      )?.action;
      if (newPlaybackSpeed) {
        videoRef.current.playbackRate = newPlaybackSpeed;
        toast.success(`Playback speed changed to ${newPlaybackSpeed}x`, {
          duration: 2000,
        });
      }
    };
    window.addEventListener("keydown", handlePlaybackChange);

    return () => {
      window.removeEventListener("keydown", handlePlaybackChange);
    };
  }, []);

  // Store current video timing on component unmount and move current video to pip
  useEffect(() => {
    let localVideoRef = null;
    if (videoRef.current) localVideoRef = videoRef.current;

    return () => {
      if (!localVideoRef.paused) {
        updatePip({
          courseId: id,
          lessonId: lessonIdRef.current,
          timing: localVideoRef.currentTime,
          link: courseDetails.lessons?.find((o) => o.id === lessonIdRef.current)
            ?.link,
          autoplay: true,
        });
      }
      dispatch(
        coursesActions.changeProgress({
          courseId: id,
          lessonId: lessonIdRef.current,
          timing: localVideoRef.currentTime,
        })
      );
    };
    // eslint-disable-next-line
  }, []);

  const moveToPip = () => {
    if (videoRef.current) {
      dispatch(
        coursesActions.changeProgress({
          courseId: id,
          lessonId: searchParams.get("lesson_id"),
          timing: videoRef.current.currentTime,
        })
      );
    }
    updatePip({
      courseId: id,
      lessonId: lessonIdRef.current,
      timing: videoRef.current.currentTime,
      link: courseDetails.lessons?.find((o) => o.id === lessonIdRef.current)
        ?.link,
      autoplay: !videoRef.current.paused,
      handleOnClose: () => setOpenedInPip(false),
    });
    setOpenedInPip(true);
  };

  // Init hls and attach video to it
  if (
    Hls.isSupported() &&
    courseDetails.lessons &&
    activeLessonId &&
    videoRef.current
  ) {
    var hls = new Hls();
    const link = courseDetails.lessons?.find(
      (o) => o.id === activeLessonId
    )?.link;
    if (link && videoRef.current.link !== link && videoRef) {
      hls.loadSource(link);
      hls.attachMedia(videoRef.current);
      videoRef.current.onplay = () => updatePip(null);
    } else {
      if (videoLinkPresent) {
        setVideoLinkPresent(false);
      }
    }
  }

  return videoLinkPresent ? (
    <div className="course__lessons__video">
      {!openedInPip && (
        <Button
          className="course__lessons__video__btn"
          onClick={() => moveToPip()}
        >
          Open in pip
        </Button>
      )}
      <video
        controls
        ref={videoRef}
        className="course__lessons__video__elem"
      ></video>
    </div>
  ) : (
    <div className="course__lessons__video--not-found">
      Sorry... There is no such video
    </div>
  );
};

export default Video;
