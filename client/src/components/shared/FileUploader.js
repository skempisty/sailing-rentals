import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import Constants from '../../utils/constants'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(
  FilePondPluginImageExifOrientation, // ensure image isn't rotated
  FilePondPluginImagePreview // enable image preview on drop
)

const StyledFileUploader = styled.div`
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
        />
      </StyledFileUploader>
    )
  }
}

FileUploader.propTypes = {
  bucketDirectory: PropTypes.oneOf(['boats', 'carousel', 'posts']).isRequired,
  onFileChange: PropTypes.func.isRequired
}
