import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import AppRoutes from 'routes/index'

import { Provider } from 'react-redux'
import ThemeSettings from 'theme'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import 'firebase/functions' // <- needed if using httpsCallable
import 'firebase/storage' // <- needed if using httpsCallable
import 'firebase/analytics' // <- needed if using analytics

import { firebase as fbConfig, reduxFirebase as rfConfig } from 'config'

// Initialize Firebase instance
firebase.initializeApp(fbConfig)
firebase.firestore() // <- needed if using firestore
firebase.functions() // <- needed if using httpsCallable
firebase.auth() // <- needed if using auth
firebase.analytics() // <- needed if using analytics

const theme = createMuiTheme(ThemeSettings)

function App({ store }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rfConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}>
          <AppRoutes />
        </ReactReduxFirebaseProvider>
      </Provider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
