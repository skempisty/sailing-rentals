import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

import Constants from '../../utils/constants'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(
  FilePondPluginImageExifOrientation, // ensure image isn't rotated
  FilePondPluginImagePreview, // enable image preview on drop
  FilePondPluginFileValidateType // enable file type validation
)

const StyledFileUploader = styled.div`
  .filepond--root {
    margin-bottom: 0;
  }
  
  .filepond--credits {
    display: none;
  }
`

export default class FileUploader extends React.Component {
  render() {
    const { bucketDirectory, onFileChange } = this.props

    return (
      <StyledFileUploader>
        <FilePond
          server={{
            url: `${Constants.baseUrl}/api/images?category=${bucketDirectory}`,
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            },
            process: {
              onload: (response) => onFileChange(response)
            }
          }}
          acceptedFileTypes={['image/*']}
        />
      </StyledFileUploader>
    )
  }
}

FileUploader.propTypes = {
  bucketDirectory: PropTypes.oneOf(['boats', 'carousel', 'posts']).isRequired,
  onFileChange: PropTypes.func.isRequired
}
