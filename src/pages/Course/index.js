import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSwr from "swr";
import toast from "react-hot-toast";
import Hls from "hls.js";

import Lesson from "./Lesson";
import PlaybackSpeed from "./PlaybackSpeed";

import { hotkeysParams } from "../../schemes/hotkeysParams";
import { usePip } from "../../hooks";
import { coursesActions } from "../../store/ducks/courses";
import { Button } from "react-bootstrap";

const Course = () => {
  const [activeLessonId, setActiveLessonId] = useState("");
  const [videoLinkPresent, setVideoLinkPresent] = useState(true);
  const [openedInPip, setOpenedInPip] = useState(false);

  const videoRef = useRef();
  let lessonIdRef = useRef();
  const location = useLocation();
  const { updatePip } = usePip();

  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Courses);

  const { data: token } = useSwr({
    url: "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
  });
  const { data: courseDetails } = useSwr(() => ({
    url: `https://api.wisey.app/api/v1/core/preview-courses/${id}`,
    params: [["token", token.token]],
  }));

  // Init new course in redux state if there is no such in there
  useEffect(() => {
    if (courseDetails && courses && !courses.find((c) => c.courseId === id)) {
      dispatch(
        coursesActions.initCourse({
          courseId: id,
          activeLessonId: courseDetails.lessons[0].id,
        })
      );
    }
    // eslint-disable-next-line
  }, [courseDetails]);

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

  // Add lesson id to search params if there is no stored one and store new one in redux store
  useEffect(() => {
    let currentCourse = courses?.find((c) => c.courseId === id);
    if (!searchParams.get("lesson_id")) {
      if (currentCourse) {
        setSearchParams(`lesson_id=${currentCourse.activeLessonId}`);
        setActiveLessonId(currentCourse.activeLessonId);
      } else {
        dispatch(
          coursesActions.changeActiveLesson({
            courseId: id,
            activeLessonId: courseDetails.lessons[0].id,
          })
        );
        setSearchParams(`lesson_id=${courseDetails.lessons[0].id}`);
        setActiveLessonId(courseDetails.lessons[0].id);
      }
    } else {
      setActiveLessonId(searchParams.get("lesson_id"));
      lessonIdRef.current = searchParams.get("lesson_id");
      if (currentCourse.activeLessonId !== searchParams.get("lesson_id")) {
        dispatch(
          coursesActions.changeActiveLesson({
            courseId: id,
            activeLessonId: searchParams.get("lesson_id"),
          })
        );
      }
    }
    // eslint-disable-next-line
  }, [location]);

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

  // Init hls and attach video to it
  if (Hls.isSupported() && courseDetails.lessons && activeLessonId) {
    var hls = new Hls();
    const link = courseDetails.lessons?.find(
      (o) => o.id === activeLessonId
    )?.link;
    if (link && videoRef.current.link !== link) {
      hls.loadSource(link);
      hls.attachMedia(videoRef.current);
      videoRef.current.onplay = () => updatePip(null);
    } else {
      if (videoLinkPresent) {
        setVideoLinkPresent(false);
      }
    }
  }

  // Handle change lesson
  const handleChangeLesson = (newLessonId) => {
    if (videoRef.current) {
      dispatch(
        coursesActions.changeProgress({
          courseId: id,
          lessonId: searchParams.get("lesson_id"),
          timing: videoRef.current.currentTime,
        })
      );
    }
    setSearchParams(`lesson_id=${newLessonId}`);
    setActiveLessonId(newLessonId);
  };

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

  return (
    <div className="course page-layout">
      <div className="course__lessons">
        {videoLinkPresent ? (
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
        )}
        <div className="course__lessons__list">
          {courseDetails.lessons
            ?.sort((a, b) => a.order - b.order)
            .map((lesson, idx) => (
              <Lesson
                data={lesson}
                key={idx}
                activeLesson={activeLessonId}
                handleClick={handleChangeLesson}
              />
            ))}
        </div>
      </div>
      <div className="course__details">{courseDetails.title}</div>
      <PlaybackSpeed params={hotkeysParams} />
    </div>
  );
};

export default Course;
