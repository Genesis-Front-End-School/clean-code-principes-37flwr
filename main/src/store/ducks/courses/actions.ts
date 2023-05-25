import types from './actionTypes';
import {
  IActiveLesson,
  IProgress,
  IUpdateCourses,
} from '../../interfaces/Courses.interfaces';

const changeProgress = (payload: IProgress) => ({
  type: types.CHANGE_PROGRESS,
  payload,
});

const changeProgressSuccess = (payload: IUpdateCourses) => ({
  type: types.CHANGE_PROGRESS_SUCCESS,
  payload,
});

const changeActiveLesson = (payload: IActiveLesson) => ({
  type: types.CHANGE_ACTIVE_LESSON,
  payload,
});

const changeActiveLessonSuccess = (payload: IUpdateCourses) => ({
  type: types.CHANGE_ACTIVE_LESSON_SUCCESS,
  payload,
});

const initCourse = (payload: IActiveLesson) => ({
  type: types.INIT_COURSE,
  payload,
});

const initCourseSuccess = (payload: IUpdateCourses) => ({
  type: types.INIT_COURSE_SUCCESS,
  payload,
});

const apiError = () => ({
  type: types.API_ERROR,
});

const actions = {
  changeProgress,
  changeProgressSuccess,
  changeActiveLesson,
  changeActiveLessonSuccess,
  initCourse,
  initCourseSuccess,
  apiError,
};

export default actions;
