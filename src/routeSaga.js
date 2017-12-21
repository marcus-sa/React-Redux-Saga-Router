import { all, call, fork, put } from 'redux-saga'

import * as actions from './actions'
import * as stored from './storedSagas'

export function* runStoredSaga({ props }) {
  /*yield put(navigate.runSaga(props))
  const routeSaga = yield select(
    state => state.sagaRouter[props.component].saga
  )*/

  yield call(stored.getSaga(props.component), props)
  yield put(actions.stopSaga(props))
}

export function* routeSaga() {
  yield takeLatest(RUN_SAGA, runStoredSaga)
}

export default function* root() {
  yield all([
    fork(routeSaga)
  ])
}
