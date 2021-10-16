import React, { useState, useEffect } from 'react'

import { Form, Dropdown } from 'react-bootstrap'
import Switch from 'react-switch'

import Box from '../../../shared/styled-system/Box'
import Flex from '../../../shared/styled-system/Flex'
import MultiStepModal from '../../../shared/modals/MultiStepModal'
import ModalStep from '../../../shared/modals/MultiStepModal/ModalStep'
import RentalCalendar from '../../../shared/RentalCalendar'

import User from '../../../../domains/User'
import Event from '../../../../domains/Event'
import Calendar from '../../../../domains/Calendar'
import isNotDeleted from '../../../../utils/isNotDeleted'

import getUserById from '../../../../store/orm/users/getUserById'
import getBoatById from '../../../../store/orm/boats/getBoatById'
import { useClasses } from '../../../../store/classes'
import { useUsers } from '../../../../store/users'
import { useBoats } from '../../../../store/boats'
import { useRentals } from '../../../../store/rentals'

const EditClassMtgModal = ({ show, mtg, mtgIndex, onHide }) => {
  const [state, setState] = useState({})

  useEffect(() => {
    setState(Event.clearStartEnd(mtg))
  }, [mtg])

  const { addEditClass, updateAddEditClass } = useClasses()
  const { users } = useUsers()
  const { boats } = useBoats()
  const { allRentals } = useRentals()

  const events = () => {
    let calendarEvents = addEditClass.meetings

    if (state.boatId > 0) {
      const rentalsForBoat = allRentals.filter(rental => rental.boatId === state.boatId)

      const { upcomingEvents } = Event.splitUpcomingAndPast(rentalsForBoat)

      // add all rentals using the same boat
      calendarEvents = calendarEvents.concat(upcomingEvents)
    }

    return Calendar.getEventsForCalendar(state, calendarEvents)
  }

  const handleSelectSlot = ({ start, end }) => {
    setState({ ...state, start, end  })
  }

  const handleSaveClick = () => {
    const updatedMtgs = [ ...addEditClass.meetings ]

    updatedMtgs[mtgIndex] = state

    updateAddEditClass({ meetings: updatedMtgs })

    onHide()
  }

  const { name, instructorId, details } = state

  return (
    <MultiStepModal
      show={show}
      large
      title='Edit Class Meeting'
      submitBtnText='Save'
      onHide={onHide}
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
        <Flex alignItems='center' height='2em'>
          <Form.Label style={{ margin: '0 0.5em 0 0' }}><b>Use Boat</b></Form.Label>

          <Switch
            checked={state.boatId !== null}
            onChange={() => setState({ ...state, boatId: state.boatId !== null ? null : -1 })}
          />

          {state.boatId !== null &&
            <Dropdown style={{ marginLeft: '0.5em' }}>
              <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                {state.boatId > -1 ? getBoatById(state.boatId).name : 'Select a boat'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {boats.filter(isNotDeleted).map((boat, index) =>
                  <Dropdown.Item
                    key={`boat-select-${boat.id}-${index}`}
                    onSelect={() => setState({ ...state, boatId: boat.id })}
                  >
                    {boat.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          }
        </Flex>

        <RentalCalendar
          selectedBoatId={state.boatId}
          events={events()}
          editEvent={mtg}
          rentalType='klass'
          disabled={state.boatId === -1}
          disabledMsg='Select Boat First'
          onSelectSlot={handleSelectSlot}
        />
      </ModalStep>
    </MultiStepModal>
  )
}

export default EditClassMtgModal
