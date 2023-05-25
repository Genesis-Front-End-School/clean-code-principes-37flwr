import { put, takeEvery, select } from 'redux-saga/effects';
import { IThemeState } from '../../interfaces/Theme.interfaces';

import actions from './actions';
import types from './actionTypes';

const getTheme = (state: IThemeState) => state.Theme;

export interface IChangeThemeSaga {
  payload: 'light' | 'dark';
  type: string;
}

export function* changeThemeSaga({ payload }: IChangeThemeSaga): any {
  try {
    const theme = payload;
    const currentTheme: any = yield select(getTheme);

    if (theme !== currentTheme) {
      yield put(actions.changeThemeSuccess(theme));
    } else {
      yield put(actions.apiError());
    }
  } catch {
    yield put(actions.apiError());
  }
}

function* themeSaga() {
  yield takeEvery(types.CHANGE_THEME, changeThemeSaga);
}

export default themeSaga;
