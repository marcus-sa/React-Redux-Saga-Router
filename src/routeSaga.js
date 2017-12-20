import { all, fork, put } from 'redux-saga'
import * as actions from './actions'

export function* onNavigate({ props }) {
  //yield put(navigate.runSaga(props))
  /*const routeSaga = yield select(
    state => state.sagaRouter[props.component].saga
  )*/
  //routeSaga
  yield fork(props.saga, props)
  yield put(actions.stopSaga(props))
}

export function* routeSaga() {
  yield takeLatest(RUN_SAGA, onNavigate)
}

export default function* exportSagas() {
  yield all(sagas.map(saga => fork(saga)))
}
