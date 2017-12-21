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

    if (this.props.prefetch && typeof this.props.prefetch === 'function') {
      stored.addSaga(this.props)
    }
  }

  runSaga = () => this.context.store.dispatch(actions.runSaga(this.props))

  render() {
    const { loading, component, children, prefetch, permissions, path, ...rest } = this.props
    const permComponent = getRoutesUtils({
      loading,
      isLoading: this.props[component].loading,
      listOfPermissions: permissions,
      store: this.context.store,
      prefetch: stored.hasSaga(this.props) ? this.runSaga : undefined,
    })

    const asyncComponent = (module) => require.resolve(module)

    const UniversalComponent = universal(props => import(component), {
      loading: loading,
      /*onBefore:
      onLoad:*/
    })

    if (React.isElement(component)) {
      return (
        <Route {...rest} path={path} component={component} />
      )
    } else {
      return children ? (
        <Route {...rest} path={path} {...permComponent(require(component))}>
          {children}
        </Route>
      ) : (
        <Route
          {...rest}
          path={path}
          render={props => <UniversalComponent {...props} />}
          //getComponent={() => asyncComponent(component)}
          {...permComponent()}
        />
      )
    }
        /*render={props => (
          this.props[component].loading ? (
            React.createElement(this.component)
            //<UniversalComponent page={component} {...this.props[component]} />
          ) : (
            React.createElement(loading, props)
          )
        )}*/
      />
    )
  }

}
