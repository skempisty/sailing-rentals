import React, { useState } from 'react'

import { Form, Dropdown } from 'react-bootstrap'

import Box from '../../../shared/styled-system/Box'

import MultiStepModal from '../../../shared/modals/MultiStepModal'
import ModalStep from '../../../shared/modals/MultiStepModal/ModalStep'

import User from '../../../../domains/User'

import getUserById from '../../../../store/orm/users/getUserById'
import { useClasses } from '../../../../store/classes'
import { useUsers } from '../../../../store/users'

const EditClassMtgModal = ({ show, mtg, index, onHide }) => {
  const initialMtg = { ...mtg }

  const [state, setState] = useState({ ...mtg })

  const { addEditClass, updateAddEditClass } = useClasses()
  const { users } = useUsers()

  const resetAndHide = () => {
    setState(initialMtg)

    onHide()
  }

  const handleSaveClick = () => {
    const updatedMtgs = [ ...addEditClass.meetings ]

    updatedMtgs[index] = state

    updateAddEditClass({ meetings: updatedMtgs })

    onHide()
  }

  const { name, instructorId, details } = state

  return (
    <MultiStepModal
      show={show}
      title='Edit Class Meeting'
      submitBtnText='Save'
      onHide={resetAndHide}
      onSubmit={handleSaveClick}
    >
      <ModalStep>
        <Form>
          <Form.Label><b>Meeting Name</b></Form.Label>
          <Form.Control
            type='text'
            value={name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />

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
                    onSelect={() => setState({ ...state, instructorId: instructor.id })}
                  >
                    {User.buildUserFullName(instructor)}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Box>

          <Form.Label><b>Details</b></Form.Label>
          <Form.Control
            as='textarea'
            style={{ height: '5em' }}
            value={details}
            onChange={(e) => setState({ ...state, details: e.target.value })}
          />
        </Form>
      </ModalStep>

      <ModalStep>
        step 2
      </ModalStep>
    </MultiStepModal>
  )
}

export default EditClassMtgModal
