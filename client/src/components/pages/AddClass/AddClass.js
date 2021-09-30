import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Breadcrumb, Form } from 'react-bootstrap'
import CurrencyInput from 'react-currency-input-field'

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

  const handleClassSubmit = () => {
    if (View.isNewClass(classId)) {
      console.log('Create Class!')

      // TODO
      // createClassThunk()
    } else {
      console.log(`Edit Class ${classId}!`)

      // TODO
      // updateClassThunk()
    }
  }

  const pageTitle = View.isNewClass(classId) ? 'Add Class' : 'Edit Class'

  const { capacity, price, details, meetings } = addEditClass

  return (
    <ContentWrapper>
      <StyledBreadcrumb>
        <Breadcrumb.Item onClick={() => history.push('/admin-panel')}>Admin Panel</Breadcrumb.Item>
        <Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
      </StyledBreadcrumb>

      <Box color='white'>
        <Title>{pageTitle}</Title>

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
                <Form.Label><b>Details</b></Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Optional'
                  value={details}
                  onChange={(e) => updateAddEditClass({ details: e.target.value })}
                />
              </Form.Group>
            </Form>
          </ContentStep>

          <ContentStep>
            <CustomizeClassMtgs/>
          </ContentStep>
        </MultiStepContent>
      </Box>
    </ContentWrapper>
  )
}

export default AddClass
