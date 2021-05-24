import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { PayPalButton } from 'react-paypal-button-v2'

import { Button, Form, Modal, Dropdown, Col } from 'react-bootstrap'
import { FaExclamationTriangle, FaBan } from 'react-icons/fa'
import { RiSailboatFill } from 'react-icons/ri'

import EventLabel from '../../pages/Rentals/EventLabel'

import Rental from '../../../models/Rental'
import Payment from '../../../models/Payment';
import getBoatById from '../../../store/orm/boats/getBoatById'
import splitUpcomingAndPastRentals from '../../../utils/splitUpcomingAndPastRentals'
import isNotDeleted from '../../../utils/isNotDeleted'
import { paypalAccountClientId } from '../../../config'

const localizer = momentLocalizer(moment)

const StyledCalendar = styled.div`
  .rbc-calendar { padding: 0 1em 1em 1em; }

  .rbc-time-slot { min-height: 3em; }
  
  .rbc-event-content { overflow: visible }
`

class AddRentalModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { editRental } = this.props

    return {
      selectedBoatId: editRental ? editRental.boatId : '',
      crewCount: editRental ? editRental.crewCount : 0,
      view: 'month',
      date: new Date(),
      newRentalPeriod: {},
      paypalButtonReady: false
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

  handleMonthViewEventClick(event) {
    const { start } = event

    const eventMoment = moment(start)

    this.setState({
      view: 'day',
      date: new Date(eventMoment.year(), eventMoment.month(), eventMoment.date())
    })
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

  handleSaveChanges() {
    const { currentUser, onRentalEdit, editRental } = this.props
    const { newRentalPeriod, crewCount } = this.state

    const newRentalPeriodNotChosen = Object.keys(newRentalPeriod).length < 1

    const updatedRental = new Rental({
      id: editRental.id,
      start: newRentalPeriodNotChosen ? editRental.start : newRentalPeriod.start,
      end: newRentalPeriodNotChosen ? editRental.end : newRentalPeriod.end,
      boatId: newRentalPeriodNotChosen ? editRental.boatId : newRentalPeriod.boatId,
      rentedBy: currentUser.id,
      crewCount,
      createdAt: editRental.createdAt
    })

    onRentalEdit(editRental.id, updatedRental)

    this.resetAndHide()
  }

  // TODO: this should come from site settings
  get minTime() {
    const minTime = new Date()
    minTime.setHours(7,0,0)

    return minTime
  }

  // TODO: this should come from site settings
  get maxTime() {
    const maxTime = new Date()
    maxTime.setHours(20,0,0)

    return maxTime
  }

  selectedThreeHourSlot(rental) {
    return 3 === this.getRentalDurationHours(rental)
  }

  /**
   * Only way to get rental duration. Don't use the slots
   * property, it is inaccurate
   */
  getRentalDurationHours(rental) {
    const { start, end } = rental

    const duration = moment.duration(moment(end).diff(moment(start)))

    /*
     * Sometimes duration.asHours() gives a result like 2.9999, probably as a
     * result of a bug with react-big-calendar. This rounds to the nearest 100th
     * to adjust for this issue
     */
    return Math.round((duration.asHours() + Number.EPSILON) * 100) / 100
  }

  convertRentalTimeToDates(rental) {
    return {
      start: new Date(rental.start),
      end: new Date(rental.end),
      boatId: rental.boatId
    }
  }

  getBlockingBoatName(rental) {
    let { myRentals } = this.props

    const selectionDate = {
      day: moment(rental.end).date(),
      month: moment(rental.end).month(),
      year: moment(rental.end).year()
    }

    const selectionDateString = JSON.stringify(selectionDate)

    const blockingRental =  myRentals.filter(isNotDeleted).find(rental => {
      return selectionDateString === JSON.stringify({
        day: moment(rental.end).date(),
        month: moment(rental.end).month(),
        year: moment(rental.end).year()
      })
    })

    return getBoatById(blockingRental.boatId).name
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
    const rentalsWithDateFormatting = allRentals.filter(isNotDeleted).map(rental => {
      return new Rental({
        ...rental,
        start: new Date(rental.start),
        end: new Date(rental.end)
      })
    })

    const { upcomingRentals } = splitUpcomingAndPastRentals(rentalsWithDateFormatting)

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

  get selectedBoatRentalPrice() {
    const { newRentalPeriod, selectedBoatId } = this.state

    const boat = getBoatById(selectedBoatId)
    const hoursRented = this.getRentalDurationHours(newRentalPeriod)

    return (boat.perHourRentalCost * hoursRented).toFixed(2)
  }

  get validRental() {
    const MINIMUM_CREW_COUNT = 1

    const { editRental } = this.props
    const {
      selectedBoatId,
      newRentalPeriod,
      crewCount
    } = this.state

    return (
      (
        (
          editRental && JSON.stringify(newRentalPeriod) === '{}'
        )
          ||
        (
          !this.selectionOverlapsOtherRental(newRentalPeriod) &&
          !this.alreadyRentedThisDay(newRentalPeriod) &&
          this.selectedThreeHourSlot(newRentalPeriod) &&
          !this.rentalStartsInPast(newRentalPeriod)
        )
      ) &&
      !!selectedBoatId &&
      crewCount >= MINIMUM_CREW_COUNT
    )
  }

  rentalStartsInPast(rentalSelection) {
    if (!rentalSelection.start) return true

    return moment(rentalSelection.start).isBefore()
  }

  alreadyRentedThisDay(rentalSelection) {
    let { myRentals, editRental } = this.props

    const selectionDate = {
      day: moment(rentalSelection.end).date(),
      month: moment(rentalSelection.end).month(),
      year: moment(rentalSelection.end).year()
    }

    const selectionDateString = JSON.stringify(selectionDate)

    if (editRental) {
      // the saved time slot of the editing rental doesn't count for this validation
      myRentals = myRentals.filter(rental => rental.id !== editRental.id)
    }

    return myRentals.filter(isNotDeleted).some(rental => {
      return selectionDateString === JSON.stringify({
        day: moment(rental.end).date(),
        month: moment(rental.end).month(),
        year: moment(rental.end).year()
      })
    })
  }

  /**
   * Determines if the selected time slot
   * overlaps an existing rental on the same boat
   */
  selectionOverlapsOtherRental(rentalSelection) {
    let { allRentals, editRental } = this.props

    const selectionStart = moment(rentalSelection.start)
    const selectionEnd = moment(rentalSelection.end)

    if (editRental) {
      // the saved time slot of the editing rental doesn't count for this validation
      allRentals = allRentals.filter(rental => rental.id !== editRental.id)
    }

    return allRentals.some((rental) => {
      const rentalStart = moment(rental.start)
      const rentalEnd = moment(rental.end)

      const selectionIsBefore = selectionStart.isSameOrBefore(rentalStart) && selectionEnd.isSameOrBefore(rentalStart)
      const selectionIsAfter = selectionStart.isSameOrAfter(rentalEnd) && selectionEnd.isSameOrAfter(rentalEnd)

      return !(selectionIsBefore || selectionIsAfter)
    })
  }

  eventStyleGetter(rental) {
    const { currentUser, editRental } = this.props
    const { view } = this.state

    // background color
    let backgroundColor

    if (editRental && editRental.id === rental.id) {
      backgroundColor = 'dodgerblue' // one of the user's other rental slots
    } else if (rental.rentedBy === currentUser.id) {
      backgroundColor = 'purple' // one of the user's other rental slots
    } else if (rental.id) {
      backgroundColor = 'grey' // someone else's rental slot
    } else if (
      this.alreadyRentedThisDay(rental) ||
      this.selectionOverlapsOtherRental(rental) ||
      this.rentalStartsInPast(rental) ||
      !this.selectedThreeHourSlot(rental)
    ) {
      backgroundColor = 'red' // invalid time slot selection
    } else {
      backgroundColor = 'green' // valid time slot selection
    }

    // event relative size
    const width = `${(rental.end - rental.start) / (this.maxTime - this.minTime) * 100}%`

    // positioning
    const minTimeDate = this.minTime.setFullYear(rental.start.getFullYear(), rental.start.getMonth(), rental.start.getDate())

    const left = `${(rental.start - minTimeDate) / (this.maxTime - this.minTime) * 100}%`

    const style = {
      position: view === 'month' ? 'relative' : null,
      left: view === 'month' ? left : null,
      width: view === 'month' ? width : null,
      backgroundColor
    }

    return { style }
  }

  titleAccessor(rental) {
    const { currentUser, editRental } = this.props
    const { view } = this.state

    const { name: boatName } = getBoatById(rental.boatId)

    let label, icon

    if (editRental && editRental.id === rental.id) {
      label = 'Saved time slot'
      icon = <RiSailboatFill/>
    } else if (rental.rentedBy === currentUser.id) {
      label = 'My rental'
      icon = <RiSailboatFill/>
    } else if (rental.id) {
      label = 'Unavailable'
      icon = <FaBan/>
    } else if (this.alreadyRentedThisDay(rental)) {
      label = `You've rented the ${this.getBlockingBoatName(rental)} for today already`
      icon = <FaExclamationTriangle/>
    } else if (this.selectionOverlapsOtherRental(rental)) {
      label = 'Boat already rented at this time'
      icon = <FaExclamationTriangle/>
    } else if (this.rentalStartsInPast(rental)) {
      label = 'Please select a time slot in the future'
      icon = <FaExclamationTriangle/>
    } else if (!this.selectedThreeHourSlot(rental)) {
      label = 'Please select a 3 hour time slot'
      icon = <FaExclamationTriangle/>
    } else if (editRental && !rental.id) {
      label = 'Updated time slot'
      icon = <RiSailboatFill/>
    } else {
      label = `Sailing on the ${boatName}`
      icon = <RiSailboatFill/>
    }

    const showSvgComponent = view === 'day' || this.getRentalDurationHours(rental) >= 3

    return (
      <EventLabel
        label={view === 'day' ? label : null}
        rental={rental}
        svgComponent={showSvgComponent ? icon : null}
        view={view}
        onMonthViewEventClick={this.handleMonthViewEventClick.bind(this)}
      />
    )
  }

  render() {
    const { currentUser, show, boats, editRental, onRentalAdd } = this.props
    const { selectedBoatId, newRentalPeriod, crewCount, view, date, paypalButtonReady } = this.state

    const that = this

    return (
      <Modal show={show} onHide={this.resetAndHide.bind(this)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{editRental ? 'Edit Rental' : 'Create Rental'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                {/* Boat Select */}
                <Form.Label><b>Boat</b> <span style={{ color: 'red' }}>*</span></Form.Label>

                {editRental ?
                  <Form.Control
                    value={getBoatById(editRental.boatId).name}
                    disabled
                  />
                  :
                  <Dropdown>
                    <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                      {selectedBoatId ? getBoatById(selectedBoatId).name : 'Select a boat'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {boats.filter(isNotDeleted).map((boat, index) =>
                        <Dropdown.Item
                          key={`boat-select-${boat.id}-${index}`}
                          onSelect={() => this.handleBoatSelect(boat.id)}
                        >
                          {boat.name}
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </Form.Group>

              <Form.Group as={Col}>
                {/* Crew Members Select */}
                <Form.Label><b>Crew Members</b> <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type='number'
                  value={crewCount}
                  onChange={(e) => this.setState({ crewCount: e.target.value })}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>

        <div style={{ padding: '0 1em' }}>
          <Form.Label><b>Select 3 hour time slot</b> <span style={{ color: 'red' }}>*</span></Form.Label>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Blocking overlay */}
          {!selectedBoatId &&
            <div style={{
              display: 'flex',
              pointerEvents: null,
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
          }

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

        <Modal.Footer
          style={{
            position: 'relative',
            justifyContent: editRental ? 'flex-end' : 'center',
            borderTop: 'none'
          }}
        >
          {/* Blocking overlay */}
          {(!this.validRental || !paypalButtonReady) && !editRental &&
            <div
              style={{
                pointerEvents: null,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: '225' // need 225 to fully overlay Paypal buttons
              }}
            />
          }

          {!editRental ?
            <PayPalButton
              amount={this.selectedBoatRentalPrice}
              shippingPreference='NO_SHIPPING' // default is 'GET_FROM_FILE'
              onSuccess={(details) => {
                const { id: orderId, payer, purchase_units } = details
                const payee = purchase_units[0].payee
                const capture = purchase_units[0].payments.captures[0]

                const newRental = new Rental({
                  id: null,
                  start: newRentalPeriod.start,
                  end: newRentalPeriod.end,
                  boatId: newRentalPeriod.boatId,
                  crewCount,
                  rentedBy: currentUser.id,
                  createdAt: null
                })

                const paymentObj = new Payment({
                  paidBy: currentUser.id,
                  orderId,
                  amount: capture.amount.value,
                  currency: capture.amount.currency_code,
                  payerId: payer.payer_id,
                  payerCountryCode: payer.address.country_code,
                  payerPostalCode: payer.address.postal_code || '',
                  payerEmailAddress: payer.email_address || '',
                  // payerPhone: payer.phone.phone_number.national_number,
                  payerGivenName: payer.name.given_name,
                  payerSurname: payer.name.surname,
                  payeeEmail: payee.email_address,
                  payeeMerchantId: payee.merchant_id,
                  paypalCaptureId: capture.id,
                })

                onRentalAdd(newRental, paymentObj)

                that.resetAndHide()
              }}
              onError={(e) => {
                alert(`Error contacting Paypal. Try again later`)
                console.log('e', e)
              }}
              options={{
                clientId: paypalAccountClientId, // 'PRODUCTION_CLIENT_ID'
                disableFunding: 'paylater'
              }}
              onButtonReady={() => that.setState({ paypalButtonReady: true })}
              onShippingChange={() => { return '' }} // Just having this prop forces all payment forms to render in popups instead of inline
            />
            :
            <React.Fragment>
              <Button variant='secondary' onClick={this.resetAndHide.bind(this)}>
                Cancel
              </Button>

              <Button
                variant='primary'
                disabled={!this.validRental}
                onClick={this.handleSaveChanges.bind(this)}
              >
                Save Changes
              </Button>
            </React.Fragment>
          }
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
  editRental: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}
