import { testSaga } from 'redux-saga-test-plan';
import { fork } from 'redux-saga-test-plan/matchers';
import { coursesSaga } from '../../ducks/courses';
import rootSaga from '../sagas';

describe('first', () => {
  it('should configure root saga', async () => {
    const saga = testSaga(rootSaga);
    saga
      .next()
      .all([fork(coursesSaga)])
      .next()
      .isDone();
  });
});
