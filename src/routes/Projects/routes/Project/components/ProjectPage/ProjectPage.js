import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { isLoaded } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'
import styles from './ProjectPage.styles'
import FileUploader from 'components/FileUploader'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import 'react-image-gallery/styles/css/image-gallery.css'

const useStyles = makeStyles(styles)

function ProjectImages({ images, projectId }) {
  console.log('YES', images, projectId)
  if (!images || !(projectId in images) || !images[projectId]) {
    return null
  }
  images = images[projectId]
  const imagesForGallery = []

  for (const value of Object.values(images)) {
    imagesForGallery.push({
      original: value.downloadURL
    })
  }
  return <ImageGallery items={imagesForGallery} />
}

function ProjectPage() {
  const { projectId } = useParams()
  const classes = useStyles()

  // Create listener for projects
  const projects = useSelector(({ firestore: { data } }) => data.projects)
  const projectImages = useSelector(
    ({ firebase: { data } }) => data.projectImages
  )

  // Show loading spinner while project is loading
  if (!isLoaded(projects) || !isLoaded(projectImages)) {
    return <LoadingSpinner />
  }

  console.log('projectImages', projectImages)

  const project = projects[projectId]
  if (!project) {
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} component="h2">
              {`Project seems to be missing!`}
            </Typography>
            <Typography className={classes.subtitle}>{projectId}</Typography>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} component="h2">
              {project.name || 'Project'}
            </Typography>
            <Typography className={classes.text} component="p">
              {project.description || 'Project'}
            </Typography>
            <Typography className={classes.subtitle}>{projectId}</Typography>
            <div style={{ marginTop: '10rem' }}>
              <pre>{JSON.stringify(project, null, 2)}</pre>
            </div>
          </CardContent>
        </Card>
        <FileUploader
          paths={['projectImages', projectId]}
          multiple={true}
          uniqueFile={false}
        />
        <ProjectImages
          images={projectImages}
          projectId={projectId}></ProjectImages>
      </div>
    )
  }
}

export default ProjectPage
