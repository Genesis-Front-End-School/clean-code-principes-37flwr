import types from './actionTypes';

const changeTheme = (payload: string) => ({
  type: types.CHANGE_THEME,
  payload,
});

const changeThemeSuccess = (payload: string) => ({
  type: types.CHANGE_THEME_SUCCESS,
  payload,
});

const apiError = () => ({
  type: types.API_ERROR,
});

const actions = {
  changeTheme,
  changeThemeSuccess,
  apiError,
};

export default actions;
