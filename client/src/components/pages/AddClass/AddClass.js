import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Breadcrumb, Card, Form } from 'react-bootstrap'
import CurrencyInput from 'react-currency-input-field'
import { Editor } from '@tinymce/tinymce-react'

import Box from '../../shared/styled-system/Box'
import Title from '../../shared/styled-system/Title'
import ContentWrapper from '../../shared/ContentWrapper'
import StyledBreadcrumb from '../../shared/StyledBreadcrumb'
import MultiStepContent from '../../shared/MultiStepContent'
import ContentStep from '../../shared/MultiStepContent/ContentStep'

import CustomizeClassMtgs from './CustomizeClassMtgs'

import View from '../../../domains/views/AddClass'

import { useClasses } from '../../../store/classes'

const AddClass = () => {
  const { id: classId } = useParams()
  const history = useHistory()

  const {
    addEditClass,
    updateAddEditClass,
    createClassThunk,
    getClassThunk
  } = useClasses()

  const fetchData = async () => {
    if (View.isNewClass(classId)) {
      updateAddEditClass({ meetings: View.defaultClassMtgs })
    } else {
      // await getClassThunk(classId)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClassSubmit = async () => {
    if (View.isNewClass(classId)) {
      const { payload: { error: validationErrorMsg } } = await createClassThunk(addEditClass)

      if (validationErrorMsg) return // TODO: display this msg somewhere
    } else {
      // updateClassThunk(addEditClass)
    }

    history.push('/admin-panel#classes')
  }

  const pageTitle = View.isNewClass(classId) ? 'Add Class' : 'Edit Class'

  const { capacity, price, details } = addEditClass

  return (
    <ContentWrapper>
      <StyledBreadcrumb>
        <Breadcrumb.Item onClick={() => history.push('/admin-panel')}>Admin Panel</Breadcrumb.Item>
        <Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
      </StyledBreadcrumb>

      <Box color='white'>
        <Title>{pageTitle}</Title>

        <Box maxWidth='40em'>
          <MultiStepContent onSubmit={handleClassSubmit}>
            <ContentStep>
              <Form>
                <Form.Group>
                  <Form.Label><b>Class Capacity</b></Form.Label>
                  <Form.Control
                    type='text'
                    value={capacity}
                    onChange={(e) => updateAddEditClass({ capacity: e.target.value })}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label><b>Registration Price</b></Form.Label>
                  <CurrencyInput
                    className='form-control'
                    decimalsLimit={2}
                    prefix='$'
                    value={price}
                    onValueChange={(value) => updateAddEditClass({ price: value })}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label style={{ color: 'white' }}><b>Details</b></Form.Label>

                  <Card style={{ padding: '0.5em' }}>
                    <Editor
                      value={details}
                      apiKey='k7k4vfwhahx9lkapst52sfshfl2z36j4wmnsycw2lc30avnv'
                      init={{
                        placeholder: 'Optional',
                        height: 500,
                        menubar: false,
                        elementpath: false,
                        contextmenu: false,
                        branding: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table emoticons paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                          'bold italic forecolor emoticons | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                      onEditorChange={(value) => updateAddEditClass({ details: value })}
                    />
                  </Card>
                </Form.Group>
              </Form>
            </ContentStep>

            <ContentStep>
              <CustomizeClassMtgs/>
            </ContentStep>
          </MultiStepContent>
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default AddClass
