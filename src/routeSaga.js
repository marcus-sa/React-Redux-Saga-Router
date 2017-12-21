import { all, call, fork, put } from 'redux-saga'

import * as actions from './actions'
import * as stored from './storedSagas'

export function* runStoredSaga({ componentProps }) {
  /*yield put(navigate.runSaga(props))
  const routeSaga = yield select(
    state => state.sagaRouter[props.component].saga
  )*/

  yield call(stored.getSaga(componentProps.component), componentProps)
  yield put(actions.stopSaga(componentProps))
}

export function* routeSaga() {
  yield takeLatest(RUN_SAGA, runStoredSaga)
}

export default function* root() {
  yield all([
    fork(routeSaga)
  ])
}
