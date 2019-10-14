import { combineReducers } from 'redux'
import { reducer as firebase } from 'react-redux-firebase'
import { firestoreReducer as firestore } from 'redux-firestore' // <- needed if using firestore

import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'modules/notification'
import locationReducer from './location'

export function makeRootReducer(asyncReducers) {
  return combineReducers({
    // Add sync reducers here
    firebase,
    firestore,
    form,
    notifications,
    location: locationReducer,
    ...asyncReducers
  })
}

export function injectReducer(store, { key, reducer }) {
  store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
