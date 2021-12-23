import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react'

const RichTextArea = ({ value, placeholder, height, onChange }) => {
  return (
    <Card style={{ padding: '0.5em' }}>
      <Editor
        value={value}
        apiKey='k7k4vfwhahx9lkapst52sfshfl2z36j4wmnsycw2lc30avnv'
        init={{
          placeholder,
          height,
          menubar: false,
          elementpath: false,
          contextmenu: false,
          branding: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table emoticons paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | fontsizeselect | ' +
            'bold italic forecolor emoticons link | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={(newValue) => onChange(newValue)}
      />
    </Card>
  )
}

RichTextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

RichTextArea.defaultProps = {
  placeholder: 'Optional',
  height: 500
}

export default RichTextArea
