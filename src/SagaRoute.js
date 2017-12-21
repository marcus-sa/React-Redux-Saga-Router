import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import universal from 'react-universal-component'

import getRoutesUtils from './routePermission'
import * as stored from './storedSagas'
import * as actions from './actions'
//import sagas from './routeSaga'

@connect(state => ({ ...state.sagaRouter }))
export default class SagaRoute extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    loading: PropTypes.element,
    path: PropTypes.string.isRequired,
    component: PropTypes.oneOf([
      PropTypes.element,
      PropTypes.string
    ]),
    permissions: PropTypes.func,
    prefetch: PropTypes.func
  }

  static contextTypes = {
    store: PropTypes.object
  }

  constructor() {
    super()

    //const { preload } = this.component = require(this.props.component)

    if (this.props.prefetch) {
      stored.addSaga(this.props)
    }
  }

  prefetch = () => this.context.store.dispatch(actions.runSaga(this.props))

  render() {
    const { isLoading, loading, component, children, prefetch, permissions, path, ...rest } = this.props

    const UniversalComponent = universal(props => import(component), {
      loading: loading,
      isLoading
      ...rest
      /*onBefore:
      onLoad:*/
    })

    const permComponent = getRoutesUtils({
      //UniversalComponent,
      //props: { ...rest },
      //isLoading: this.props[component].loading,
      listOfPermissions: permissions,
      store: this.context.store,
      prefetch: stored.hasSaga(this.props) ? this.prefetch : undefined,
    })

    /*const componentParams = {
      ...rest
      path,
    }

    if (permissions) {
      componentParams = merge(componentParams, ...permComponent(UniversalComponent))
    }*/

    if (!permissions && !children) {
      return (
        <Route {...rest} path={path} component={UniversalComponent} />
      )
    } else if (children) {
      return permissions ? (
        <Route {...rest} path={path} {...permComponent()}>
          {children}
        </Route>
      ) : (
        <Route {...rest} path={path}>
          {children}
        </Route>
      )
    } else {
      return (
        <Route {...rest} path={path} {...permComponent(UniversalComponent)} />
      )
    }
  }

}
