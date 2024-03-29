import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FilePond, registerPlugin } from 'react-filepond'
import { FaTrash } from 'react-icons/fa'

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

export default class ImageUploader extends React.Component {
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
      bucketDirectory,
      allowMultiple,
      maxWidth,
      onFileChange,
      onRemoveFileClick,
      onPreviewRemove
    } = this.props

    return (
      <StyledFileUploader
        $maxWidth={maxWidth}
      >
        {file ?
          <div style={{ position: 'relative' }}>
            {onRemoveFileClick &&
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  padding: '0.5em',
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderTopRightRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={onRemoveFileClick}
              >
                <FaTrash color='white' />
              </div>
            }

            <img
              src={file}
              alt=''
              style={{
                width: '100%',
                minHeight: '4em',
                boxShadow: '0px 0px 0px 2px black',
                borderRadius: '5px'
              }}
            />
          </div>
          :
          <FilePond
            ref={ref => this.pond = ref}
            server={{
              url: `${Constants.baseUrl}/api/images?category=${bucketDirectory}`,
              revert: null, // endpoint for when image is removed
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
              },
              process: {
                onload: (response) => onFileChange(response)
              }
            }}
            acceptedFileTypes={['image/*']}
            maxFileSize='3MB'
            allowMultiple={allowMultiple}
            onremovefile={onPreviewRemove}
          />
        }
      </StyledFileUploader>
    )
  }
}

ImageUploader.propTypes = {
  file: PropTypes.string,
  bucketDirectory: PropTypes.oneOf(['boats', 'carousel', 'posts']).isRequired,
  allowMultiple: PropTypes.bool,
  maxWidth: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onRemoveFileClick: PropTypes.func,
  onPreviewRemove: PropTypes.func,
  triggerPreviewRemove: PropTypes.bool
}
