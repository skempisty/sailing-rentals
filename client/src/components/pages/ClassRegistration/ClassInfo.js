import React, { useEffect, useState } from 'react'

import { Button, Card } from 'react-bootstrap'

import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'
import Title from '../../shared/styled-system/Title'
import RichTextArea from '../../shared/RichTextArea'

import { useClasses } from '../../../store/classes'
import { useSession } from '../../../store/session'
import { useSettings } from '../../../store/settings'

const ClassInfo = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [showSaveChangesBtn, setShowSaveChangesBtn] = useState(false)

  const {
    classInfo: { html: infoHtml, files: infoFiles },
    setClassInfo,
    getClassInfoThunk
  } = useClasses()

  const { updateSettingsThunk } = useSettings()

  const { currentUser } = useSession()

  const fetchData = async () => {
    getClassInfoThunk()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRichTextChange = (newValue) => {
    if (!showSaveChangesBtn) {
      setShowSaveChangesBtn(true)
    }

    setClassInfo({ html: newValue, files: infoFiles })
  }

  const handleSaveChangesClick = () => {
    setShowSaveChangesBtn(false)
    updateSettingsThunk({ class_info_html: infoHtml })
  }

  return (
    <>
      <Title as='h2'>Sailing Class Information</Title>

      {!!currentUser.isAdmin &&
        <Flex marginBottom='1em'>
          <Button onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? 'View' : 'Edit'}</Button>

          {showSaveChangesBtn &&
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

      {/*<FileUploader*/}
      {/*  file={imageUrl}*/}
      {/*  bucketDirectory='class_info'*/}
      {/*  maxWidth='20em'*/}
      {/*  labelMaxFileSize='Max file size is {filesize}'*/}
      {/*  onFileChange={(downloadUrl) => this.setState({ uploadedImageUrl: downloadUrl })}*/}
      {/*  onRemoveFileClick={() => this.setState({ imageUrl: '' })}*/}
      {/*/>*/}
    </>
  )
}

export default ClassInfo
