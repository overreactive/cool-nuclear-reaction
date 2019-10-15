import React from 'react'
import { map } from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'
import { useNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components'
import { get } from 'lodash'
import cuid from 'cuid'

function FileUploader({
  firebase,
  paths,
  uploadedFiles,
  onFinish,
  multiple,
  uniqueFile
}) {
  const filePath = paths.join('/')
  const { showSuccess, showError } = useNotifications()

  function onFilesDrop(files) {
    if (files.length === 0) {
      showError(multiple ? 'Multiple File Upload Failed' : 'Single File Only!')
      return
    }
    return firebase
      .uploadFiles(filePath, files, filePath, { name: cuid() })
      .then(filesSaved => {
        showSuccess('File Uploaded sucessfully')
        if (uniqueFile) {
          if (uploadedFiles) {
            for (const [key, value] of Object.entries(uploadedFiles)) {
              firebase.deleteFile(value.fullPath, `${filePath}/${key}`)
            }
          }
        }
        if (!multiple) {
          const unique = filesSaved[0]
          onFinish(unique)
        } else {
          onFinish(filesSaved)
        }
      })
      .catch(err => {
        showError('Could not upload file')
      })
  }
  function onFileDelete(file, key) {
    return firebase.deleteFile(file.fullPath, `${filePath}/${key}`)
  }

  return (
    <div>
      <Dropzone multiple={multiple} onDrop={onFilesDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles, (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
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

export default compose(
  firebaseConnect(props => [
    {
      path: props.paths.join('/')
    }
  ]),
  connect(({ firebase: { data, auth } }, ownProps) => ({
    uploadedFiles: get(data[ownProps.paths.slice(0, -1).join('/')], auth.uid)
  })),
  spinnerWhileLoading(['uploadedFiles'])
)(FileUploader)
