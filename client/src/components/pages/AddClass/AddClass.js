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
import RichTextArea from "../../shared/RichTextArea";

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
                <Box maxWidth='10em'>
                  <Form.Group>
                    <Form.Label><b>Class Capacity</b></Form.Label>
                    <Form.Control
                      type='number'
                      value={capacity}
                      onChange={(e) => updateAddEditClass({ capacity: e.target.value })}
                    />
                  </Form.Group>
                </Box>

                <Box maxWidth='10em'>
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
                </Box>

                <Form.Group>
                  <Form.Label style={{ color: 'white' }}><b>Details</b></Form.Label>

                  <RichTextArea
                    value={details}
                    onChange={(newDetails) => updateAddEditClass({ details: newDetails })}
                  />
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
