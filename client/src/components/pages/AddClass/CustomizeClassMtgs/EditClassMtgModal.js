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
  const [state, setState] = useState({ name: '', details: '' })

  useEffect(() => {
    if (show) {
      setState(Event.clearStartEnd(mtg))
    }
  }, [show])

  const { addEditClass, updateAddEditClass } = useClasses()
  const { users } = useUsers()
  const { boats } = useBoats()
  const { allRentals } = useRentals()

  const events = () => {
    let calendarEvents = addEditClass.meetings

    if (state.boatId > 0) {
      const rentalsForBoat = allRentals.filter(rental => rental.boatId === state.boatId)

      const { upcomingEvents } = Event.splitUpcomingAndPast(rentalsForBoat)

      /*
       * Exclude rentals made by this class. The rentals
       * made by this class are included as events already
       */
      const classRentalIds = addEditClass.meetings.map(mtg => mtg.rentalId).filter(Boolean)

      const filteredEvents = upcomingEvents.filter(event => !classRentalIds.includes(event.id))

      // add all rentals using the same boat
      calendarEvents = calendarEvents.concat(filteredEvents)
    }

    return Calendar.getEventsForCalendar(state, calendarEvents)
  }

  const handleUseBoatSwitchClick = () => {
    /*
     * Null means NOT using boat
     * -1 means using boat but one isn't chosen
     */
    const newBoatId = state.boatId !== null ? null : -1

    /*
     * Determine if we should clear mtg time slot.
     * It may conflict with an existing rental for the boat you want.
     */
    const isEnablingUseBoat = newBoatId === -1

    setState({
      ...state,
      boatId: newBoatId,
      start: isEnablingUseBoat ? null : state.start,
      end: isEnablingUseBoat ? null : state.end
    })
  }

  const handleBoatSelect = (selectedBoatId) => {
    setState({ ...state, boatId: selectedBoatId, start: null, end: null })
  }

  const handleSelectSlot = ({ start, end }) => {
    setState({ ...state, start, end  })
  }

  const handleSaveClick = () => {
    const updatedMtgs = [ ...addEditClass.meetings ]

    updatedMtgs[mtgIndex] = {
      ...state,
      // if no time slot is selected, just keep the original time slot
      start: state.start || mtg.start,
      end: state.end || mtg.end
    }

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
            placeholder='Put meeting links and other useful info specific to this meeting here.'
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
            onChange={handleUseBoatSwitchClick}
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
                    onSelect={() => handleBoatSelect(boat.id)}
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
