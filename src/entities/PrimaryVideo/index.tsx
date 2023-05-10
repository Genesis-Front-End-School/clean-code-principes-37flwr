import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Hls from 'hls.js';
import { useParams, useSearchParams } from 'react-router-dom';
import { coursesActions } from 'store/ducks/courses';
import { usePip } from 'app/context/hooks';
import { HOTKEY_PARAMS } from 'shared/constants/hotkeys';
import { ICourseWithLessons } from 'shared/interfaces/Course.interface';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Button } from 'react-bootstrap';
import { ReduxCourse } from 'shared/interfaces/ReduxCourses.interface';

interface IVideoProps {
  activeLessonId: string;
  courseDetails: ICourseWithLessons;
  lessonIdRef: React.RefObject<string>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const PrimaryVideo = ({
  activeLessonId,
  courseDetails,
  lessonIdRef,
  videoRef,
}: IVideoProps) => {
  const [openedInPip, setOpenedInPip] = useState(false);
  const [videoLinkPresent, setVideoLinkPresent] = useState(true);
  let [searchParams, _] = useSearchParams();

  const { id } = useParams();
  const updatePip = usePip();

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.Courses);

  // Set video timing to be equal to stored value
  useEffect(() => {
    const timing = courses
      .find((c: ReduxCourse) => c.courseId === id)
      ?.progress?.find(
        (p: { lessonId: string }) => p.lessonId === activeLessonId
      )?.timing;
    if (timing && videoRef.current) {
      videoRef.current.currentTime = timing;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLessonId]);

  // Handle hotkeys for playback speed
  useEffect(() => {
    const handlePlaybackChange = (event: KeyboardEvent) => {
      const newPlaybackSpeed = HOTKEY_PARAMS.find(
        (h) => h.key === event.key
      )?.action;
      if (newPlaybackSpeed && videoRef.current) {
        videoRef.current.playbackRate = parseInt(newPlaybackSpeed);
        toast.success(`Playback speed changed to ${newPlaybackSpeed}x`, {
          duration: 2000,
        });
      }
    };
    window.addEventListener('keydown', handlePlaybackChange);

    return () => {
      window.removeEventListener('keydown', handlePlaybackChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Store current video timing on component unmount and move current video to pip
  useEffect(() => {
    let localVideoRef: HTMLVideoElement | null = null;
    if (videoRef.current) localVideoRef = videoRef.current;

    return () => {
      if (localVideoRef) {
        if (!localVideoRef.paused) {
          const link = getLinkFromCourse(courseDetails);
          if (id && lessonIdRef.current && link)
            updatePip?.({
              courseId: id,
              lessonId: lessonIdRef.current,
              timing: localVideoRef.currentTime,
              link,
              autoplay: true,
            });
        }
        if (id && lessonIdRef.current) {
          dispatch(
            coursesActions.changeProgress({
              courseId: id,
              lessonId: lessonIdRef.current,
              timing: localVideoRef.currentTime,
            })
          );
        }
      }
    };
    // eslint-disable-next-line
  }, []);

  const moveToPip = () => {
    if (videoRef.current) {
      const lessonId = searchParams.get('lesson_id');
      if (id && lessonId)
        dispatch(
          coursesActions.changeProgress({
            courseId: id,
            lessonId,
            timing: videoRef.current.currentTime,
          })
        );
      const link = getLinkFromCourse(courseDetails);
      if (id && lessonIdRef.current && link) {
        updatePip?.({
          courseId: id,
          lessonId: lessonIdRef.current,
          timing: videoRef.current.currentTime,
          link,
          autoplay: !videoRef.current.paused,
          handleOnClose: () => setOpenedInPip(false),
        });
        setOpenedInPip(true);
      }
    }
  };

  const getLinkFromCourse = (course: ICourseWithLessons) =>
    course.lessons?.find((o) => o.id === lessonIdRef.current)?.link;

  // Init hls and attach video to it
  if (
    Hls.isSupported() &&
    courseDetails.lessons &&
    activeLessonId &&
    videoRef.current
  ) {
    var hls = new Hls();
    const link = getLinkFromCourse(courseDetails);

    if (link) {
      hls.loadSource(link);
      hls.attachMedia(videoRef.current);
      videoRef.current.onplay = () => updatePip?.(null);
    } else {
      if (videoLinkPresent) {
        setVideoLinkPresent(false);
      }
    }
  }

  if (!videoLinkPresent) {
    return (
      <div
        className="course__lessons__video--not-found"
        data-testid="video-fallback"
      >
        Sorry... There is no such video
      </div>
    );
  }

  return (
    <div className="course__lessons__video" data-testid="video-element">
      {!openedInPip && (
        <Button
          className="course__lessons__video__btn"
          data-testid="move-to-pip-btn"
          onClick={() => moveToPip()}
        >
          Open in pip
        </Button>
      )}
      <video
        data-testid="video-player"
        controls
        ref={videoRef}
        className="course__lessons__video__elem"
      ></video>
    </div>
  );
};

export default PrimaryVideo;
