import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import useSwr from "swr";
import toast from "react-hot-toast";
import Hls from "hls.js";

import Lesson from "./Lesson";
import PlaybackSpeed from "./PlaybackSpeed";

import { hotkeysParams } from "../../schemes/hotkeysParams";
import { usePip } from "../../hooks";
import { coursesActions } from "../../store/ducks/courses";
import {
  COURSES_FETCH_LINK,
  TOKEN_FETCH_LINK,
} from "../../constants/ApiCallLinks";
import Video from "./Video";
import Details from "./Details";
import useCourseLocation from "./hooks/useCourseLocation";

const Course = () => {
  const videoRef = useRef();
  let lessonIdRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  let [_, setSearchParams] = useSearchParams();
  const { courses } = useSelector((state) => state.Courses);

  const { data: token } = useSwr({
    url: TOKEN_FETCH_LINK,
  });
  const { data: courseDetails } = useSwr(() => ({
    url: `${COURSES_FETCH_LINK}/${id}`,
    params: [["token", token.token]],
  }));

  const { idSearchParams, currentCourse } = useCourseLocation(courseDetails);

  // Set new id for activeLessonId state and
  const setLessonId = (id) => {
    setSearchParams(`lesson_id=${id}`);
  };

  // Handle change lesson
  const handleChangeLesson = (newLessonId) => {
    if (videoRef.current) {
      dispatch(
        coursesActions.changeProgress({
          courseId: id,
          lessonId: idSearchParams,
          timing: videoRef.current.currentTime,
        })
      );
    }
    setLessonId(newLessonId);
  };

  useEffect(() => {
    if (idSearchParams) {
      lessonIdRef.current = idSearchParams;
    } else {
      if (currentCourse) {
        setLessonId(currentCourse.activeLessonId);
      } else {
        setLessonId(courseDetails.lessons[0].id);
      }
    }
    // eslint-disable-next-line
  }, [idSearchParams, currentCourse]);

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

  return (
    <div className="course page-layout">
      <div className="course__lessons">
        <Video
          activeLessonId={idSearchParams}
          courseDetails={courseDetails}
          lessonIdRef={lessonIdRef}
          videoRef={videoRef}
        />
        <div className="course__lessons__list">
          <Details
            courseDetails={courseDetails}
            activeLessonId={idSearchParams}
            handleChange={handleChangeLesson}
          />
        </div>
      </div>
      <div className="course__details">{courseDetails.title}</div>
      <PlaybackSpeed params={hotkeysParams} />
    </div>
  );
};

export default Course;