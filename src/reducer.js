import merge from 'lodash/object/merge'

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
      return {
        ...state,
        componentProps: action.props,
        isLoading: true
      }
      /*return merge({}, state, {
        [action.props.component]: {
          componentProps: action.props
          isLoading: true
        }
      })*/

    case STOP_SAGA:
      return {
        ...state,
        isLoading: false
      }
      /*return merge({}, state, {
        [action.props.component]: {
          isLoading: false
        }
      })*/

    default:
      return state
  }
}
