import { all, fork } from 'redux-saga/effects';

// Sagas
import { coursesSaga } from '../ducks/courses';
import { themeSaga } from '../ducks/theme';

export default function* rootSaga() {
  yield all([
    //courses
    fork(coursesSaga),
    fork(themeSaga),
  ]);
}
