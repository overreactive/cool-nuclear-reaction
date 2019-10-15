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
import FileUploader from 'components/FileUploader'
const useStyles = makeStyles(styles)

function AccountPage({ firebase, profile, auth }) {
  const classes = useStyles()

  const { showSuccess, showError } = useNotifications()

  function updateAccount(newAccount) {
    return firebase
      .updateProfile(newAccount)
      .then(() => showSuccess('Profile updated successfully'))
      .catch(error => {
        showError('Error updating profile')
        return Promise.reject(error)
      })
  }

  function updateUserProfiles(files_metadata) {
    firebase
      .updateProfile({
        avatarUrl: files_metadata.downloadURL
      })
      .then(profile => {
        showSuccess('Updated Profile Avatar')
      })
      .catch(err => {
        showError('Could Not Update Profile Avatar')
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
            <FileUploader
              paths={['userAvatars', auth.uid]}
              onFinish={updateUserProfiles}
              multiple={false}
              uniqueFile={true}></FileUploader>
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
  connect(({ firebase: { profile, auth } }) => ({ profile, auth })),
  spinnerWhileLoading(['profile', 'auth'])
)

export default enhance(AccountPage)
