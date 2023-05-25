import React from 'react';
import actionTypes from '../actionTypes';
import reducer from '../reducers';

describe('Course store reducers', () => {
  const initialState = {
    courses: [],
    loading: false,
  };

  it('should call change progress reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.CHANGE_PROGRESS,
      payload: 1,
    });
    expect(rsp).toEqual({ ...initialState, loading: true });
  });

  it('should call change progress success reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.CHANGE_PROGRESS_SUCCESS,
      payload: 1,
    });
    expect(rsp).toEqual({ ...initialState, loading: false, courses: 1 });
  });

  it('should call change active lesson reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.CHANGE_ACTIVE_LESSON,
      payload: 1,
    });
    expect(rsp).toEqual({ ...initialState, loading: true });
  });

  it('should call change active lesson success reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.CHANGE_ACTIVE_LESSON_SUCCESS,
      payload: 1,
    });
    expect(rsp).toEqual({ ...initialState, loading: false, courses: 1 });
  });

  it('should call init course reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.INIT_COURSE,
      payload: 1,
    });
    expect(rsp).toEqual({ ...initialState, loading: true });
  });

  it('should call init course success reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.INIT_COURSE_SUCCESS,
      payload: 1,
    });
    expect(rsp).toEqual({ ...initialState, loading: false, courses: 1 });
  });

  it('should call api error reducer', () => {
    const rsp = reducer(initialState, {
      type: actionTypes.API_ERROR,
      payload: 1,
    });
    expect(rsp).toEqual(initialState);
  });

  it('should call default reducer', () => {
    const rsp = reducer(initialState, {
      type: 'willFailType',
      payload: 1,
    });
    expect(rsp).toEqual(initialState);
  });

  it('should return default state if not provided one', () => {
    const rsp = reducer(undefined, {
      type: 'willFailType',
      payload: 1,
    });
    expect(rsp).toEqual(initialState);
  });
});
