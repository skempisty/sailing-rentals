import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Button, Form, Modal, Dropdown, Col } from 'react-bootstrap'
import { FaExclamationTriangle } from 'react-icons/fa'
import { RiSailboatFill } from 'react-icons/ri'

import EventLabel from './EventLabel'

import Rental from '../../../models/Rental'
import getBoatById from '../../../store/orm/boats/getBoatById'
import splitUpcomingAndPastRentals from '../../../utils/splitUpcomingAndPastRentals'

const localizer = momentLocalizer(moment)

const StyledCalendar = styled.div`
  .rbc-calendar { padding: 0 1em 1em 1em; }

  .rbc-time-slot { min-height: 3em; }
`

class AddRentalModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    return {
      selectedBoatId: '',
      crewCount: 0,
      view: 'month',
      date: new Date(),
      newRentalPeriod: {}
    }
  }

  handleSelectSlot(e) {
    const { selectedBoatId } = this.state
    const { start, end, slots } = e

    const clickMoment = moment(slots[0])

    const isSingleDateClick = slots.length === 1 && clickMoment.hour() === 0
    const isDayRangeSelect = moment(start).hour() !== 0

    if (isSingleDateClick) {
      // drill down to clicked day on calendar
      this.setState({
        view: 'day',
        date: new Date(clickMoment.year(), clickMoment.month(), clickMoment.date())
      })
    } else if (isDayRangeSelect) {
      const newRentalPeriod = {
        start,
        end,
        boatId: selectedBoatId
      }

      this.setState({ newRentalPeriod })
    }
  }

  handleBoatSelect(id) {
    const { selectedBoatId } = this.state

    // only change state if selected boat changes
    if (id !== selectedBoatId) {
      this.setState({
        selectedBoatId: id,
        newRentalPeriod: {}
      })
    }
  }

  handleProceedClick() {
    const { currentUser, onRentalAdd } = this.props
    const { newRentalPeriod, crewCount, selectedBoatId } = this.state

    const newRental = new Rental({
      start: newRentalPeriod.start,
      end: newRentalPeriod.end,
      rentedBy: currentUser.id,
      boatId: selectedBoatId,
      crewCount
    })

    onRentalAdd(newRental)

    this.resetAndHide()
  }

  get minTime() {
    const minTime = new Date()
    minTime.setHours(7,0,0)

    return minTime
  }

  get maxTime() {
    const maxTime = new Date()
    maxTime.setHours(20,0,0)

    return maxTime
  }

  /**
   * Only way to determine if a time slot is 3 hours. Don't use the slots
   * property, it is inaccurate
   */
  selectedThreeHourSlot(rental) {
    const { start, end } = rental

    const duration = moment.duration(moment(end).diff(moment(start)))

    /*
     * Sometimes duration.asHours() gives a result like 2.9999, probably as a
     * result of a bug with react-big-calendar. This rounds to the nearest 100th
     * to adjust for this issue
     */
    const hours = Math.round((duration.asHours() + Number.EPSILON) * 100) / 100

    return hours === 3
  }

  resetAndHide() {
    const { onHide } = this.props

    this.setState(this.initialState)
    onHide()
  }

  get rentals() {
    const { allRentals } = this.props
    const { newRentalPeriod, selectedBoatId } = this.state

    if (!selectedBoatId) return []

    // rental start/end times must be Date objects for React Big Calendar
    allRentals.forEach(rental => {
      rental.start = new Date(rental.start)
      rental.end = new Date(rental.end)
    })

    const { upcomingRentals } = splitUpcomingAndPastRentals(allRentals)

    const allEvents = [
      newRentalPeriod,
      ...upcomingRentals
    ]

    if (selectedBoatId) {
      return allEvents.filter(rental => rental.boatId === selectedBoatId)
    } else {
      return allEvents
    }
  }

  get validRental() {
    const MINIMUM_CREW_COUNT = 1

    const {
      selectedBoatId,
      newRentalPeriod,
      crewCount
    } = this.state

    return (
      this.selectedThreeHourSlot(newRentalPeriod) &&
      !this.rentalStartsInPast(newRentalPeriod) &&
      !!selectedBoatId &&
      crewCount >= MINIMUM_CREW_COUNT
    )
  }

  rentalStartsInPast(rental) {
    if (!rental.start) return true

    return moment(rental.start).isBefore()
  }

  alreadyRentedThisDay(rentalSelection) {
    const { myRentals } = this.props

    const selectionDate = {
      day: moment(rentalSelection.end).date(),
      month: moment(rentalSelection.end).month(),
      year: moment(rentalSelection.end).year()
    }

    const selectionDateString = JSON.stringify(selectionDate)

    return myRentals.some(rental => {
      return selectionDateString === JSON.stringify({
        day: moment(rental.end).date(),
        month: moment(rental.end).month(),
        year: moment(rental.end).year()
      })
    })
  }

  eventStyleGetter(rental) {
    const {currentUser} = this.props

    let backgroundColor

    if (rental.rentedBy === currentUser.id) {
      backgroundColor = 'purple' // one of the user's other rental slots
    } else if (rental.id) {
      backgroundColor = 'grey' // someone else's rental slot
    } else if (
      this.alreadyRentedThisDay(rental) ||
      this.rentalStartsInPast(rental) ||
      !this.selectedThreeHourSlot(rental)
    ) {
      backgroundColor = 'red' // invalid time slot selection
    } else {
      backgroundColor = 'green' // valid time slot selection
    }

    const style = {
      backgroundColor
    }

    return { style }
  }

  titleAccessor(rental) {
    const { currentUser } = this.props
    const { view } = this.state

    const { name: boatName } = getBoatById(rental.boatId)

    if (rental.rentedBy === currentUser.id) {
      return <EventLabel label={'My rental'} svgComponent={<RiSailboatFill/>} view={view} />
    } else if (rental.id) {
      return <EventLabel label={'Unavailable'} svgComponent={<RiSailboatFill/>} view={view} />
    } else if (this.alreadyRentedThisDay(rental)) {
      return <EventLabel label={'Cannot rent more than once per day'} svgComponent={<FaExclamationTriangle/>} view={view} />
    } else if (this.rentalStartsInPast(rental)) {
      return <EventLabel label={'Please select a time slot in the future'} svgComponent={<FaExclamationTriangle/>} view={view} />
    } else if (!this.selectedThreeHourSlot(rental)) {
      return <EventLabel label={'Please select a 3 hour time slot'} svgComponent={<FaExclamationTriangle/>} view={view} />
    } else if (!boatName) {
      return <EventLabel label={'Select a boat'} svgComponent={<FaExclamationTriangle/>} view={view} />
    } else {
      return <EventLabel label={`Sailing on the ${boatName}`} svgComponent={<RiSailboatFill/>} view={view} />
    }
  }

  render() {
    const { show, boats } = this.props
    const { selectedBoatId, crewCount, view, date } = this.state

    return (
      <Modal show={show} onHide={this.resetAndHide.bind(this)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Rental</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                {/* Boat Select */}
                <Form.Label><b>Boat</b></Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                    {selectedBoatId ? getBoatById(selectedBoatId).name : 'Select a boat'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {boats.map((boat, index) =>
                      <Dropdown.Item
                        key={`boat-select-${boat.id}-${index}`}
                        onSelect={() => this.handleBoatSelect(boat.id)}
                      >
                        {boat.name}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group as={Col}>
                {/* Crew Members Select */}
                <Form.Label><b>Crew Members</b></Form.Label>
                <Form.Control
                  type='number'
                  value={crewCount}
                  onChange={(e) => this.setState({ crewCount: e.target.value })}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>

        <div style={{ position: 'relative' }}>
          {/* Blocking overlay */}
          <div style={{
            display: selectedBoatId ? 'none' : 'flex',
            pointerEvents: selectedBoatId ? 'none' : null,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: '5' // need 5 to fully overlay Calendar
          }}>
            <h2>Select a boat first!</h2>
          </div>

          <StyledCalendar>
            <Calendar
              localizer={localizer}
              style={{ height: '30em', marginTop: '1em' }}
              views={['month', 'day']}
              timeslots={1}
              selectable
              view={view}
              date={date}
              events={this.rentals}
              min={this.minTime} // set earliest time visible on calendar
              max={this.maxTime} // set latest time visible on calendar
              eventPropGetter={(e) => this.eventStyleGetter(e)}
              titleAccessor={(e) => this.titleAccessor(e)}
              onView={(view) => this.setState({ view })} // fires when one of the view buttons is pressed
              onNavigate={(date) => this.setState({ date })}
              onSelectSlot={this.handleSelectSlot.bind(this)}
            />
          </StyledCalendar>
        </div>

        <Modal.Footer>
          <Button variant='secondary' onClick={this.resetAndHide.bind(this)}>
            Cancel
          </Button>

          <Button
            variant='primary'
            disabled={!this.validRental}
            onClick={this.handleProceedClick.bind(this)}
          >
            Create Rental
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.session
  const { boats } = state.boats
  const { myRentals, allRentals } = state.rentals

  return { currentUser, boats, myRentals, allRentals }
}

export default connect(
  mapStateToProps,
  null
)(AddRentalModal)

AddRentalModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}
