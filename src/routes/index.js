import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ProjectsRoute from './Projects'
import AccountRoute from './Account'
import NotFoundRoute from './NotFound'
import { spinnerWhileLoading } from 'utils/components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { BrowserRouter as Router } from 'react-router-dom'

function createRoutes() {
  return (
    <Router>
      <CoreLayout>
        <Switch>
          {/* Exact Home Route */}
          <Route exact path={Home.path} component={() => <Home.component />} />
          {/* Build Route components from routeSettings */
          [
            AccountRoute,
            ProjectsRoute,
            SignupRoute,
            LoginRoute
            /* Add More Routes Here */
          ].map((route, index) => (
            <Route key={`Route-${index}`} {...route} />
          ))}
          <Route component={NotFoundRoute.component} />
        </Switch>
      </CoreLayout>
    </Router>
  )
}

const enhance = compose(
  firebaseConnect(() => ['auth']),
  connect(({ firebase: { auth } }) => ({ auth })),
  spinnerWhileLoading(['auth'])
)

export default enhance(createRoutes)
