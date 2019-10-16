import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ProjectRoute from 'routes/Projects/routes/Project'
import { useNotifications } from 'modules/notification'
import { renderChildren } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsPage.styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firestoreConnect,
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

const useStyles = makeStyles(styles)

function ProjectsPage({ auth, profile, match, firestore, projects }) {
  const classes = useStyles()
  const [newDialogOpen, changeDialogState] = useState(false)
  const { showSuccess, showError } = useNotifications()
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  const createProject = project => {
    firestore
      .collection('projects')
      .add({
        ...project,
        authorFirstName: profile.firstName || null,
        authorLastName: profile.lastName || null,
        createdBy: auth.uid,
        createdAt: new Date()
      })
      .then(() => {
        toggleDialog()
        showSuccess('Project added!')
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add project')
        return Promise.reject(err)
      })
  }

  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute], match, { auth: auth })}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <div className={classes.root}>
            <NewProjectDialog
              onSubmit={createProject}
              open={newDialogOpen}
              onRequestClose={toggleDialog}
            />
            <div className={classes.tiles}>
              <NewProjectTile onClick={toggleDialog} />
              {!isEmpty(projects) &&
                projects.map((project, ind) => {
                  return (
                    <ProjectTile
                      key={`Project-${project.id}-${ind}`}
                      name={project.name}
                      projectId={project.id}
                    />
                  )
                })}
            </div>
          </div>
        )}
      />
    </Switch>
  )
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired, // from withRouter (wrapper)
  firestore: PropTypes.object.isRequired, // from firestoreConnect (connect HOC)
  auth: PropTypes.object.isRequired // from connect mapStateToProps
}

function mapStateToProps(state) {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projectImages: state.firebase.data.projectImages
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'projects',
      where: [['createdBy', '==', props.auth.uid]]
    }
  ]),
  firebaseConnect(props => [{ path: `projectImages` }])
)(ProjectsPage)
