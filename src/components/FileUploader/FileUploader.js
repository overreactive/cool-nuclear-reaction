import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { useSelector } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'

// Path within Database for metadata (also used for file Storage path)
const fileBasePath = 'projectImages'

function FileUploader({ firebase, projectId }) {
  const filePath = fileBasePath + '/' + projectId
  console.log('filePath: ' + filePath)
  const uploadedFiles = useSelector(state => state.firebase.data[fileBasePath])

  console.log(uploadedFiles)
  function onFilesDrop(files) {
    console.log(filePath)
    return firebase.uploadFiles(filePath, files, filePath)
  }
  function onFileDelete(file, key) {
    return firebase.deleteFile(file.fullPath, `${filePath}/${key}`)
  }

  function getImageDownloadUrl(imageName) {
    console.log("get image download url", filePath, imageName);
    firebase.storage().ref(filePath).child(imageName).getDownloadURL().then(url => {
      console.log("url, ", url);
      return url;
    })
  }

  return (
    <div>
      <Dropzone onDrop={onFilesDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {uploadedFiles && uploadedFiles[projectId] && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles[projectId], (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
              { getImageDownloadUrl(file.name) }
              <button onClick={() => onFileDelete(file, key)}>
                Delete File
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default firebaseConnect(props => [
  {
    path: `${fileBasePath}/${props.projectId}`
  }
])(FileUploader)
