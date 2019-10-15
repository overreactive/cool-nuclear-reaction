import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useNotifications } from 'modules/notification'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountPage.styles'
import { spinnerWhileLoading } from 'utils/components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
const useStyles = makeStyles(styles)

function AccountPage({ firebase, profile }) {
  const classes = useStyles()

  const { showSuccess, showError } = useNotifications()

  function updateAccount(newAccount) {
    return firebase
      .updateProfile(newAccount)
      .then(() => showSuccess('Profile updated successfully'))
      .catch(error => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        showError('Error updating profile: ', error.message || error)
        return Promise.reject(error)
      })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.pane}>
        <div className={classes.settings}>
          <div>
            <img
              className={classes.avatarCurrent}
              src={profile.avatarUrl || defaultUserImageUrl}
              alt=""
            />
          </div>
          <div className={classes.meta}>
            <AccountForm
              onSubmit={updateAccount}
              account={profile}
              initialValues={profile}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

const enhance = compose(
  firebaseConnect(() => ['profile']),
  connect(({ firebase: { profile } }) => ({ profile })),
  spinnerWhileLoading(['profile'])
)

export default enhance(AccountPage)
