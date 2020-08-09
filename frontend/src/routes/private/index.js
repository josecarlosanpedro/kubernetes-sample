import React, { Fragment, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loading from '../Loading';
import privateRoutesList from './private.routes';
import NotFound from '../../components/Common/NotFound'

const privateList = [
  ...privateRoutesList,
]

const PrivateRoutes = isLoggedIn => (
  <Fragment>
    <Suspense fallback={<Loading />}>
      <Switch>
        {privateList.map(r => (
          <Route
            key={r.id}
            path={r.path}
            component={r.component}
            exact={r.exact}
          />
        ))
        }
        {isLoggedIn &&
          <Route path="*" component={() => <NotFound />} />
        }
      </Switch>
    </Suspense>
  </Fragment>
)


export default PrivateRoutes;
