import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CurrencyInput from 'react-currency-input-field'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'

import Box from '../../../shared/styled-system/Box'

import getUserById from '../../../../store/orm/users/getUserById'
import User from '../../../../domains/User'

import { useUsers } from '../../../../store/users'
import { useClasses } from '../../../../store/classes'

const AddClassModal = ({ show, klass, onHide }) => {
  const { users } = useUsers()
  const { createClassThunk, updateClassThunk } = useClasses()

  const DEFAULT_INSTRUCTOR_ID = -1 // unselected
  const DEFAULT_CAPACITY = 5
  const DEFAULT_PRICE = 225.00
  const DEFAULT_DETAILS = 'this class is pretty hard. you\'ll basically be cpt. jack sparrow after this shit'

  const [instructorId, setInstructorId] = useState(klass ? klass.instructorId : DEFAULT_INSTRUCTOR_ID)
  const [capacity, setCapacity] = useState(klass ? klass.capacity : DEFAULT_CAPACITY)
  const [price, setPrice] = useState(klass ? klass.price : DEFAULT_PRICE)
  const [details, setDetails] = useState(klass ? klass.details : DEFAULT_DETAILS)

  const resetAndHide = () => {
    setInstructorId(DEFAULT_INSTRUCTOR_ID)
    setCapacity(DEFAULT_CAPACITY)
    setPrice(DEFAULT_PRICE)
    setDetails(DEFAULT_DETAILS)
    onHide()
  }

  const handleSaveClassClick = async () => {
    const classObj = {
      instructorId,
      capacity,
      details,
      price
    }

    if (klass) {
      await updateClassThunk({
        id: klass.id,
        classObj
      })
    } else {
      await createClassThunk(classObj)
    }

    onHide()
  }

  return (
    <Modal show={show} onHide={resetAndHide}>
      <Modal.Header closeButton>
        <Modal.Title>{klass ? 'Edit Class' : 'Add Class'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label><b>Assign Instructor</b></Form.Label>

          <Box marginBottom='1em'>
            <Dropdown>
              <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                {instructorId > -1 ? User.buildUserFullName(getUserById(instructorId)) : 'Select an instructor for this class'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {User.getInstructors(users).map((instructor, index) =>
                  <Dropdown.Item
                    key={`instructor-select-${instructor.id}-${index}`}
                    onSelect={() => setInstructorId(instructor.id)}
                  >
                    {User.buildUserFullName(instructor)}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Box>

          <Form.Group>
            <Form.Label><b>Class Capacity</b></Form.Label>
            <Form.Control
              type='text'
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label><b>Registration Price</b></Form.Label>
            <CurrencyInput
              className='form-control'
              decimalsLimit={2}
              prefix='$'
              value={price}
              onValueChange={(value) => setPrice(value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label><b>Details</b></Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Optional'
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={resetAndHide}>
          Cancel
        </Button>

        <Button variant='primary' onClick={handleSaveClassClick}>
          {klass ? 'Save Changes' : 'Create Class'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

AddClassModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  klass: PropTypes.object
}

export default AddClassModal
