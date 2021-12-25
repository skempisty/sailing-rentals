import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FilePond, registerPlugin } from 'react-filepond'
import { FaFile, FaTrash } from 'react-icons/fa'

import Flex from './styled-system/Flex'
import Text from './styled-system/Text'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

import Constants from '../../utils/constants'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(
  FilePondPluginImageExifOrientation, // ensure image isn't rotated
  FilePondPluginImagePreview, // enable image preview on drop
  FilePondPluginFileValidateType, // enable file type validation
  FilePondPluginFileValidateSize // handles blocking of file uploads that are too large
)

const StyledFileUploader = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || null};

  .filepond--root {
    margin-bottom: 0;
  }
  
  .filepond--credits {
    display: none;
  }
`

export default class FileUploader extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.triggerPreviewRemove !== this.props.triggerPreviewRemove) {
      this.removePreview()
    }
  }

  removePreview() {
    this.pond.removeFile()
  }

  render() {
    const {
      file,
      displayedFileName,
      bucketDirectory,
      maxWidth,
      showDeleteFileBtn,
      onFileChange,
      onRemoveFileClick,
      onPreviewRemove
    } = this.props

    return (
      <StyledFileUploader
        $maxWidth={maxWidth}
      >
        {file ?
          <Flex alignItems='center'>
            <FaFile style={{ marginRight: '0.5em' }}/>

            <Text><a href={file}>{displayedFileName}</a></Text>

            {showDeleteFileBtn &&
              <FaTrash
                style={{
                  marginLeft: '0.5em',
                  cursor: 'pointer'
                }}
                onClick={onRemoveFileClick}
              />
            }
          </Flex>
          :
          <FilePond
            ref={ref => this.pond = ref}
            server={{
              url: `${Constants.baseUrl}/api/zip_file?category=${bucketDirectory}`,
              revert: null, // endpoint for when file is removed
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
              },
              process: {
                onload: (response) => onFileChange(response)
              }
            }}
            acceptedFileTypes={['.zip']}
            maxFileSize='20MB'
            onremovefile={onPreviewRemove}
          />
        }
      </StyledFileUploader>
    )
  }
}

FileUploader.propTypes = {
  file: PropTypes.string,
  bucketDirectory: PropTypes.oneOf(['class_info']).isRequired,
  maxWidth: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onRemoveFileClick: PropTypes.func,
  onPreviewRemove: PropTypes.func,
  triggerPreviewRemove: PropTypes.bool
}
