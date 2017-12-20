import { RUN_SAGA, ADD_SAGA } from './constants'

export const stopSaga = (props: Object) => ({ type: STOP_SAGA, props })

export const runSaga = (props: Object) => ({ type: RUN_SAGA, props })

export const addSaga = (props: Object) => ({ type: ADD_SAGA, props })
