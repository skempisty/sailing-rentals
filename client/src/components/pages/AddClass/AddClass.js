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
import { useRentals } from '../../../store/rentals'

const AddClass = () => {
  const { id: classId } = useParams()
  const history = useHistory()

  const {
    addEditClass,
    setDefaultAddEditClass,
    updateAddEditClass,
    createClassThunk,
    updateClassThunk,
    getClassThunk
  } = useClasses()

  const { getAllRentalsThunk } = useRentals()

  const fetchData = async () => {
    if (View.isNewClass(classId)) {
      setDefaultAddEditClass()
    } else {
      getClassThunk(classId)
    }

    getAllRentalsThunk()
  }

  useEffect(() => {
    fetchData()
  }, [classId])

  const handleClassSubmit = async () => {
    if (View.isNewClass(classId)) {
      const { payload: { error: validationErrorMsg } } = await createClassThunk(addEditClass)

      if (validationErrorMsg) {
        alert(validationErrorMsg)
        return
      }
    } else {
      updateClassThunk({ id: classId, classObj: addEditClass })
    }

    history.push('/admin-panel#classes')
  }

  const pageTitle = View.isNewClass(classId) ? 'Add Class' : `Edit Class ${classId}`

  const { capacity, price } = addEditClass

  return (
    <ContentWrapper>
      <StyledBreadcrumb>
        <Breadcrumb.Item onClick={() => history.push('/admin-panel#classes')}>Admin Panel</Breadcrumb.Item>
        <Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
      </StyledBreadcrumb>

      <Box color='white'>
        <Title>{pageTitle}</Title>

        <Box maxWidth='40em'>
          <MultiStepContent
            submitBtnText={View.isNewClass(classId) ? 'Create Class' : 'Update Class'}
            onSubmit={handleClassSubmit}
          >
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
              </Form>

              <CustomizeClassMtgs isNewClass={View.isNewClass(classId)}/>
            </ContentStep>
          </MultiStepContent>
        </Box>
      </Box>
    </ContentWrapper>
  )
}

export default AddClass
