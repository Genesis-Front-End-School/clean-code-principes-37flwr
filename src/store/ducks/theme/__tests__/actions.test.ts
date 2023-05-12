import React from 'react';
import actions from '../actions';
import types from '../actionTypes';

describe('Courses redux actions', () => {
  it('should return change progress action', () => {
    const payload = {
      courseId: 'test-id',
      lessonId: 'lesson-id',
      timing: 1,
    };
    const res = actions.changeProgress(payload);
    expect(res).toEqual({
      payload,
      type: types.CHANGE_PROGRESS,
    });
  });

  it('should resolve change progress action', () => {
    const payload = [
      {
        courseId: 'test-main-id',
        activeLessonId: 'active-1',
        progress: [
          {
            courseId: 'test-id',
            lessonId: 'lesson-id',
            timing: 1,
          },
        ],
      },
    ];
    const res = actions.changeProgressSuccess(payload);
    expect(res).toEqual({
      payload,
      type: types.CHANGE_PROGRESS_SUCCESS,
    });
  });

  it('should return change active lesson action', () => {
    const payload = {
      courseId: 'test-main-id',
      activeLessonId: 'active-1',
    };
    const res = actions.changeActiveLesson(payload);
    expect(res).toEqual({
      payload,
      type: types.CHANGE_ACTIVE_LESSON,
    });
  });

  it('should resolve change active lesson action', () => {
    const payload = [
      {
        courseId: 'test-main-id',
        activeLessonId: 'active-1',
        progress: [
          {
            courseId: 'test-id',
            lessonId: 'lesson-id',
            timing: 1,
          },
        ],
      },
    ];
    const res = actions.changeActiveLessonSuccess(payload);
    expect(res).toEqual({
      payload,
      type: types.CHANGE_ACTIVE_LESSON_SUCCESS,
    });
  });

  it('should return init course action', () => {
    const payload = {
      courseId: 'test-main-id',
      activeLessonId: 'active-1',
    };
    const res = actions.initCourse(payload);
    expect(res).toEqual({
      payload,
      type: types.INIT_COURSE,
    });
  });

  it('should resolve init course action', () => {
    const payload = [
      {
        courseId: 'test-main-id',
        activeLessonId: 'active-1',
        progress: [
          {
            courseId: 'test-id',
            lessonId: 'lesson-id',
            timing: 1,
          },
        ],
      },
    ];
    const res = actions.initCourseSuccess(payload);
    expect(res).toEqual({
      payload,
      type: types.INIT_COURSE_SUCCESS,
    });
  });

  it('should return an error action', () => {
    const res = actions.apiError();
    expect(res).toEqual({ type: types.API_ERROR });
  });
});
