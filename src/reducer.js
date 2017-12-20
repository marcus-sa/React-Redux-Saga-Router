import { RUN_SAGA, ADD_SAGA } from './constants'

const initialState = {}

export default (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SAGA:
      return {
        ...state,
        [action.props.name]: {
          saga: action.props.saga,
          loading: false
        }
      }

    case RUN_SAGA:
      return _.merge({}, state, {
        [action.props.name]: {
          loading: true
        }
      })

    case STOP_SAGA:
      return _.merge({}, state, {
        [action.props.name]: {
          loading: false
        }
      })

    default:
      return state
  }
}
