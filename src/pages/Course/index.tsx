import { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useSwr from 'swr';

import PlaybackSpeed from './PlaybackSpeed';
import Video from './Video';
import Details from './Details';
import { coursesActions } from '../../store/ducks/courses';
import { useCourseLocation } from './hooks/useCourseLocation';
import {
  COURSES_FETCH_LINK,
  TOKEN_FETCH_LINK,
} from '../../constants/apiCallLinks';
import { HOTKEY_PARAMS } from '../../constants/hotkeys';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ReduxCourse } from '../../interfaces/ReduxCourses.interface';

const Course = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let lessonIdRef = useRef<string>('');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  let [_, setSearchParams] = useSearchParams();
  const { courses } = useAppSelector((state) => state.Courses);

  const { data: token } = useSwr({
    url: TOKEN_FETCH_LINK,
  });
  const { data: courseDetails } = useSwr(() => ({
    url: `${COURSES_FETCH_LINK}/${id}`,
    params: [['token', token.token]],
  }));

  const { idSearchParams, currentCourse } = useCourseLocation(courseDetails);

  // Set new id for activeLessonId state and
  const setLessonId = (id: string) => {
    setSearchParams(`lesson_id=${id}`);
  };

  // Handle change lesson
  const handleChangeLesson = (newLessonId: string) => {
    if (videoRef.current && id && idSearchParams) {
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
    if (
      courseDetails &&
      courses &&
      !courses.find((c: ReduxCourse) => c.courseId === id)
    ) {
      if (id)
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
      {idSearchParams && (
        <div className="course__lessons" data-testid="course-lessons">
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
      )}
      <div className="course__details">{courseDetails.title}</div>
      <PlaybackSpeed params={HOTKEY_PARAMS} />
    </div>
  );
};

export default Course;
