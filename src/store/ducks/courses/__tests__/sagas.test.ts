import React from 'react';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import coursesSaga, {
  changeActiveLessonSaga,
  changeProgressSaga,
  IChangeProgressSaga,
  ILessonSaga,
  initCourseSaga,
} from '../sagas';

import types from '../actionTypes';

const initialState = {
  Courses: {
    courses: [
      {
        courseId: '111',
        activeLessonId: '111',
        progress: [
          {
            lessonId: '111',
            timing: 1,
          },
          {
            lessonId: '222',
            timing: 1,
          },
        ],
      },
      {
        courseId: '2',
        activeLessonId: '2',
        progress: [
          {
            lessonId: '2',
            timing: 2,
          },
        ],
      },
    ],
  },
};

describe('Courses sagas', () => {
  it('should configure courses saga', async () => {
    const saga = testSaga(coursesSaga);
    saga
      .next()
      .takeEvery(types.CHANGE_PROGRESS, changeProgressSaga)
      .next()
      .takeEvery(types.CHANGE_ACTIVE_LESSON, changeActiveLessonSaga)
      .next()
      .takeEvery(types.INIT_COURSE, initCourseSaga)
      .next()
      .isDone();
  });

  describe('Change progress saga', () => {
    let payload: IChangeProgressSaga;
    beforeEach(() => {
      payload = {
        payload: {
          courseId: '111',
          lessonId: '111',
          timing: 2,
        },
        type: 'change progress',
      };
    });

    it('should successfully run saga', () => {
      const expectedResponse = [
        {
          courseId: '111',
          activeLessonId: '111',
          progress: [
            {
              lessonId: '111',
              timing: 2,
            },
            {
              lessonId: '222',
              timing: 1,
            },
          ],
        },
        {
          courseId: '2',
          activeLessonId: '2',
          progress: [
            {
              courseId: '2',
              lessonId: '2',
              timing: 2,
            },
          ],
        },
      ];
      expectSaga(changeProgressSaga, payload)
        .withState(initialState)
        .put({
          type: types.CHANGE_PROGRESS_SUCCESS,
          payload: expectedResponse,
        })
        .run();
    });

    it('should fail if not all params are given', () => {
      payload = {
        ...payload,
        payload: {
          ...payload.payload,
          courseId: '',
        },
      };

      expectSaga(changeProgressSaga, payload)
        .withState(test)
        .put({
          type: types.API_ERROR,
        })
        .run();
    });

    it('should call api error if error happens', () => {
      expectSaga(changeProgressSaga, payload)
        .withState(test)
        .throws(Error)
        .put({
          type: types.API_ERROR,
        })
        .run();
    });
  });

  describe('Change active lesson saga', () => {
    let payload: ILessonSaga;
    beforeEach(() => {
      payload = {
        payload: {
          courseId: '111',
          activeLessonId: '222',
        },
        type: 'change lesson',
      };
    });

    it('should successfully run saga', () => {
      const expectedResponse = [
        {
          courseId: '111',
          activeLessonId: '222',
          progress: [
            {
              lessonId: '111',
              timing: 1,
            },
            {
              lessonId: '222',
              timing: 1,
            },
          ],
        },
        {
          courseId: '2',
          activeLessonId: '2',
          progress: [
            {
              courseId: '2',
              lessonId: '2',
              timing: 2,
            },
          ],
        },
      ];
      expectSaga(changeActiveLessonSaga, payload)
        .withState(initialState)
        .put({
          type: types.CHANGE_ACTIVE_LESSON_SUCCESS,
          payload: expectedResponse,
        })
        .run();
    });

    it('should fail if not all params are given', () => {
      payload = {
        ...payload,
        payload: {
          ...payload.payload,
          courseId: '',
        },
      };
      expectSaga(changeActiveLessonSaga, payload)
        .withState(initialState)
        .put({
          type: types.API_ERROR,
        })
        .run();
    });

    it('should call api error if error happens', () => {
      expectSaga(changeActiveLessonSaga, payload)
        .withState(test)
        .throws(Error)
        .put({
          type: types.API_ERROR,
        })
        .run();
    });
  });

  describe('Init new course saga', () => {
    let payload: ILessonSaga;
    beforeEach(() => {
      payload = {
        payload: {
          courseId: '333',
          activeLessonId: '111',
        },
        type: 'change lesson',
      };
    });

    it('should successfully run saga', () => {
      const expectedResponse = [
        {
          courseId: '111',
          activeLessonId: '111',
          progress: [
            {
              lessonId: '111',
              timing: 1,
            },
            {
              lessonId: '222',
              timing: 1,
            },
          ],
        },
        {
          courseId: '2',
          activeLessonId: '2',
          progress: [
            {
              courseId: '2',
              lessonId: '2',
              timing: 2,
            },
          ],
        },
        {
          courseId: '333',
          activeLessonId: '111',
          progress: [],
        },
      ];
      expectSaga(initCourseSaga, payload)
        .withState(initialState)
        .put({
          type: types.CHANGE_ACTIVE_LESSON_SUCCESS,
          payload: expectedResponse,
        })
        .run();
    });

    it('should successfully create new instance of courses', () => {
      const initialState = {
        Courses: {
          courses: [],
        },
      };
      const expectedResponse = [
        {
          courseId: '333',
          activeLessonId: '111',
          progress: [],
        },
      ];
      expectSaga(initCourseSaga, payload)
        .withState(initialState)
        .put({
          type: types.CHANGE_ACTIVE_LESSON_SUCCESS,
          payload: expectedResponse,
        })
        .run();
    });

    it('should fail if there is such course already initialized', () => {
      payload = {
        ...payload,
        payload: {
          ...payload.payload,
          courseId: '111',
        },
      };
      expectSaga(initCourseSaga, payload)
        .withState(initialState)
        .put({
          type: types.API_ERROR,
        })
        .run();
    });

    it('should call api error if error happens', () => {
      expectSaga(initCourseSaga, payload)
        .withState(test)
        .throws(Error)
        .put({
          type: types.API_ERROR,
        })
        .run();
    });
  });
});
