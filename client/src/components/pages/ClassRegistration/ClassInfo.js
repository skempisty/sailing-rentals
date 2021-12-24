import React, { useEffect, useState } from 'react'

import { Button, Card } from 'react-bootstrap'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'
import Title from '../../shared/styled-system/Title'
import RichTextArea from '../../shared/RichTextArea'
import FileUploader from '../../shared/FileUploader'

import { useClasses } from '../../../store/classes'
import { useSession } from '../../../store/session'
import { useSettings } from '../../../store/settings'

const ClassInfo = () => {
  const {
    classInfo: { html: infoHtml, file: infoFile },
    setClassInfo,
    getClassInfoThunk
  } = useClasses()

  const { updateSettingsThunk } = useSettings()

  const { currentUser } = useSession()

  const [isEditMode, setIsEditMode] = useState(false)
  const [showSaveHtmlBtn, setShowSaveHtmlBtn] = useState(false)
  const [showSaveFileBtn, setShowSaveFileBtn] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)

  const fetchData = async () => {
    getClassInfoThunk()
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (infoFile) {
      setFileUrl(infoFile)
    }
  }, [infoFile])

  const handleRichTextChange = (newValue) => {
    if (!showSaveHtmlBtn) {
      setShowSaveHtmlBtn(true)
    }

    setClassInfo({ html: newValue, files: infoFile })
  }

  const handleSaveChangesClick = () => {
    setShowSaveHtmlBtn(false)
    updateSettingsThunk({ class_info_html: infoHtml })
  }

  const handleFileChange = (downloadUrl) => {
    setShowSaveFileBtn(true)
    setFileUrl(downloadUrl)
  }

  const handleSaveFilesClick = () => {
    setShowSaveFileBtn(false)
    updateSettingsThunk({ class_info_file: fileUrl })
  }

  const handleFileRemoveClick = () => {
    setShowSaveFileBtn(true)
    setFileUrl('')
  }

  return (
    <>
      <Title as='h2'>Sailing Class Information</Title>

      {!!currentUser.isAdmin &&
        <Flex marginBottom='1em'>
          <Button onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? 'View' : 'Edit'}</Button>

          {showSaveHtmlBtn &&
            <Button
              variant='success'
              style={{ marginLeft: '0.5em' }}
              onClick={handleSaveChangesClick}
            >
              Save Changes
            </Button>
          }
        </Flex>
      }

      {isEditMode ?
        <RichTextArea onChange={handleRichTextChange} value={infoHtml}/>
        :
        <Card style={{ padding: '1em', color: 'initial' }}>
          <Text dangerouslySetInnerHTML={{ __html: infoHtml }}/>
        </Card>
      }

      {(currentUser.isAdmin > 0 || fileUrl) &&
        <Box marginTop='1em'>
          <Title as='h3'>Important Files</Title>

          <FileUploader
            file={fileUrl}
            displayedFileName='Sailing Class Files'
            bucketDirectory='class_info'
            maxWidth='20em'
            labelMaxFileSize='Max file size is {filesize}'
            showDeleteFileBtn={currentUser.isAdmin > 0}
            onFileChange={handleFileChange}
            onRemoveFileClick={handleFileRemoveClick}
          />

          {showSaveFileBtn &&
            <Button style={{ marginTop: '1em' }} onClick={handleSaveFilesClick}>Save</Button>
          }
        </Box>
      }
    </>
  )
}

export default ClassInfo
