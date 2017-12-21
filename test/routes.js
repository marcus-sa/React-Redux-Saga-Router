import { SagaRouter, SagaRoute } from '../src'

import { Loading } from 'containers'

export default (history: Object) => (
  <SagaRoute path="/" loading={Loading} prefetch={loadAuth} component="./App">
    <SagaIndexRoute component={authOrElse(Home, Index)} />

    <SagaRoute permissions={userIsNotAuthenticated}>
      <SagaRoute path="register" component="Register" />
    </SagaRoute>

    <SagaRoute permissions={userIsAuthenticated}>
      <SagaRoute path="client(/:room)" component="Client" />
      <SagaRoute path="settings">
        <SagaRoute
          path="avatars"
          loading={loading}
          prefetch={loadAvatars}
          component="Settings/Avatars"
        />
        {/*<Route path="privacy" getComponent={() => System.import('./containers/Settings/Privacy')} />*/}
      </SagaRoute>
      <SagaRoute path="shop">
        <SagaIndexRoute
          loading={Loading}
          prefetch={loadDiamonds}
          component="Shop/Diamonds"
        />
        <SagaRoute
          path="boxes"
          loading={loading}
          prefetch={loadBoxes} 
          component="Shop/Boxes"
        />
      </SagaRoute>
    </SagaRoute>

    <SagaRoute path="hk/" permissions={allowedInHousekeeping}>

    </SagaRoute>

    <SagaRoute path="*" component={NotFound} status={404} />
  </SagaRoute>
)
