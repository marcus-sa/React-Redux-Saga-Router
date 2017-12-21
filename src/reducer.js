import { RUN_SAGA, ADD_SAGA } from './constants'

import * as stored from './storedSagas'

export default (state = {}, action = {}) {
  switch (action.type) {
    /*case ADD_SAGA:
      stored.addSaga(action.props)

      return {
        ...state,
        //[action.props.component]: {
          //props: action.props,
          //loading: false
        //}
      }*/

    case RUN_SAGA:
      return _.merge({}, state, {
        //[action.props.component]: {
          props: action.props
          loading: true
        //}
      })

    case STOP_SAGA:
      return _.merge({}, state, {
        //[action.props.component]: {
          loading: false
        //}
      })

    default:
      return state
  }
}
