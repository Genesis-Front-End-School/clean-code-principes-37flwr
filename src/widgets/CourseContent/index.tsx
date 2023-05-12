import { coursesActions } from 'store/ducks/courses';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Details from 'entities/LessonList';
import PlaybackSpeed from 'entities/PlaybackSpeed';
import PrimaryVideo from 'entities/PrimaryVideo';
import { useCourseLocation } from 'features/useCourseLocation';
import React, { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useFetchCourse } from 'shared/api/useFetchCourse';
import { HOTKEY_PARAMS } from 'shared/constants/hotkeys';
import { ReduxCourse } from 'shared/interfaces/ReduxCourses.interface';
import './styles.scss';

const CourseContent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let lessonIdRef = useRef<string>('');
  const { id = 'placeholder-id' } = useParams();
  const dispatch = useAppDispatch();
  let [_, setSearchParams] = useSearchParams();
  const { courses } = useAppSelector((state) => state.Courses);

  const { courseDetails } = useFetchCourse(id);

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
    <div className="course-content">
      {idSearchParams && (
        <div className="course-content__lessons" data-testid="course-lessons">
          <PrimaryVideo
            activeLessonId={idSearchParams}
            courseDetails={courseDetails}
            lessonIdRef={lessonIdRef}
            videoRef={videoRef}
          />
          <div className="course-content__lessons__list">
            <Details
              courseDetails={courseDetails}
              activeLessonId={idSearchParams}
              handleChange={handleChangeLesson}
            />
          </div>
        </div>
      )}
      <div className="course-content__details">{courseDetails.title}</div>
      <PlaybackSpeed params={HOTKEY_PARAMS} />
    </div>
  );
};

export default CourseContent;
