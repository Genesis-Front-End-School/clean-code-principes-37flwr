import { put, takeEvery, select } from 'redux-saga/effects';
import {
  IProgress,
  ICoursesState,
  ICourse,
  IUpdateCourses,
  IActiveLesson,
} from '../../interfaces/Courses.interfaces';

import actions from './actions';
import types from './actionTypes';

const getCourses = (state: ICoursesState) => state.Courses;

export interface IChangeProgressSaga {
  payload: IProgress;
  type: string;
}

export interface ILessonSaga {
  payload: IActiveLesson;
  type: string;
}

export function* changeProgressSaga({ payload }: IChangeProgressSaga): any {
  try {
    const { courseId, lessonId, timing } = payload;
    const courses: any = yield select(getCourses);

    if (timing && lessonId && courseId) {
      const modifiedProgress: IUpdateCourses = [
        ...courses.courses.map((c: ICourse) => {
          let newProgress;

          if (c.progress.find((p) => p.lessonId === lessonId)) {
            newProgress = [
              ...c.progress.map((p) =>
                p.lessonId === lessonId ? { lessonId, timing } : p
              ),
            ];
          } else {
            newProgress = [
              ...c.progress,
              {
                lessonId,
                timing,
              },
            ];
          }

          return c.courseId === courseId
            ? {
                ...c,
                progress: newProgress,
              }
            : c;
        }),
      ];

      yield put(actions.changeProgressSuccess(modifiedProgress));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    yield put(actions.apiError());
  }
}

export function* changeActiveLessonSaga({ payload }: ILessonSaga): any {
  try {
    const courses = yield select(getCourses);
    const { courseId, activeLessonId } = payload;

    const updatedCourse = courses.courses?.find(
      (c: ICourse) => c.courseId === courseId
    );

    if (updatedCourse) {
      const modifiedActiveLesson: IUpdateCourses = [
        ...courses.courses.map((c: ICourse) =>
          c.courseId === courseId ? { ...c, activeLessonId: activeLessonId } : c
        ),
      ];

      yield put(actions.changeActiveLessonSuccess(modifiedActiveLesson));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    yield put(actions.apiError());
  }
}

export function* initCourseSaga({ payload }: ILessonSaga): any {
  try {
    const courses = yield select(getCourses);
    const { courseId, activeLessonId } = payload;

    const courseAlreadyInit = courses.courses?.find(
      (c: ICourse) => c.courseId === courseId
    );

    if (!courseAlreadyInit) {
      let modifiedCourses;
      if (courses.courses.length > 0) {
        modifiedCourses = [
          ...courses.courses,
          {
            courseId,
            activeLessonId,
            progress: [],
          },
        ];
      } else {
        modifiedCourses = [
          {
            courseId,
            activeLessonId,
            progress: [],
          },
        ];
      }
      yield put(actions.changeActiveLessonSuccess(modifiedCourses));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    yield put(actions.apiError());
  }
}

function* coursesSaga() {
  yield takeEvery(types.CHANGE_PROGRESS, changeProgressSaga);
  yield takeEvery(types.CHANGE_ACTIVE_LESSON, changeActiveLessonSaga);
  yield takeEvery(types.INIT_COURSE, initCourseSaga);
}

export default coursesSaga;
