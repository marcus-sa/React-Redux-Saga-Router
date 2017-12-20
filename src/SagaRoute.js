import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import universal from 'react-universal-component'

import * as actions from './actions'
//import sagas from './routeSaga'

@connect(state => ({ ...state.sagaRouter }))
export default class SagaRoute extends Component {

  static propTypes = {
    loading: PropTypes.element,
    path: PropTypes.string,
    component: PropTypes.string,
    saga: PropTypes.func,
    role: PropTypes.string,
    isLoading: PropTypes.bool
  }

  static contextTypes = {
    store: PropTypes.object
  }

  constructor() {
    super()

    if (this.props.saga) {
      this.context.store.dispatch(
        navigate.addSaga(this.props.component, this.props.saga)
      )
    }
  }

  /*componentWillMount() {

  }

  componentDidMount() {
    if (this.props.saga) {
      this.context.store.dispatch(
        navigate.addSaga(this.props.component, this.props.saga)
      )
    }
  }*/

  runSaga = () => this.context.store.dispatch(actions.runSaga(this.props))

  render() {
    const { loading, component, children, path } = this.props

    const UniversalComponent = universal(props => import(props.page), {
      loading: loading,
      onBefore:
      onLoad:
    })

    return (
      <Route path={path} onEnter={this.runSaga}>
        {!this.props[component].isLoading ? (
          <UniversalComponent page={component} {...this.props[component]} />
        ) : (
          <loading />
        )}
      </Route>
    )
  }

}
