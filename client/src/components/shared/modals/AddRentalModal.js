import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { PayPalButton } from 'react-paypal-button-v2'

import { Button, Form, Modal, Dropdown, Col } from 'react-bootstrap'
import { FaExclamationTriangle, FaBan, FaWrench } from 'react-icons/fa'
import { RiSailboatFill } from 'react-icons/ri'

import EventLabel from '../../pages/Rentals/EventLabel'

import Rental from '../../../models/Rental'
import Payment from '../../../models/Payment';
import getBoatById from '../../../store/orm/boats/getBoatById'
import splitUpcomingAndPastRentals from '../../../utils/splitUpcomingAndPastRentals'
import isNotDeleted from '../../../utils/isNotDeleted'
import { rentalTypes } from '../../../utils/constants'
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
      reason: editRental ? editRental.reason || '' : '',
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
    const { currentUser, onRentalEdit, editRental, onHide } = this.props
    const { newRentalPeriod, crewCount, reason } = this.state

    const newRentalPeriodNotChosen = Object.keys(newRentalPeriod).length < 1

    const updatedRental = new Rental({
      id: editRental.id,
      start: newRentalPeriodNotChosen ? editRental.start : newRentalPeriod.start,
      end: newRentalPeriodNotChosen ? editRental.end : newRentalPeriod.end,
      reason,
      boatId: newRentalPeriodNotChosen ? editRental.boatId : newRentalPeriod.boatId,
      rentedBy: currentUser.id,
      crewCount,
      createdAt: editRental.createdAt
    })

    onRentalEdit(editRental.id, updatedRental)

    onHide()
  }

  handleAddMaintenance() {
    const { currentUser, onRentalAdd } = this.props
    const { newRentalPeriod, reason } = this.state

    const newRental = new Rental({
      id: null,
      type: rentalTypes.MAINTENANCE,
      start: newRentalPeriod.start,
      end: newRentalPeriod.end,
      reason,
      boatId: newRentalPeriod.boatId,
      crewCount: 1,
      rentedBy: currentUser.id,
      createdAt: null
    })

    onRentalAdd(newRental)

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

  selectedAllowedRentalInterval(rental) {
    const { settings } = this.props

    const { min_rental_hours, max_rental_hours } = settings

    const selectedRentalInterval = this.getRentalDurationHours(rental)

    return (
      selectedRentalInterval >= min_rental_hours &&
      selectedRentalInterval <= max_rental_hours
    )
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

  get isStandardType () {
    const { rentalType } = this.props

    return rentalType === rentalTypes.STANDARD
  }

  get isMaintenanceType () {
    const { rentalType } = this.props

    return rentalType === rentalTypes.MAINTENANCE
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
          (this.isMaintenanceType || !this.alreadyRentedThisDay(newRentalPeriod)) &&
          (this.isMaintenanceType || this.selectedAllowedRentalInterval(newRentalPeriod)) &&
          !this.selectionOverlapsOtherRental(newRentalPeriod) &&
          !this.rentalStartsInPast(newRentalPeriod)
        )
      ) &&
      !!selectedBoatId &&
      (this.isMaintenanceType || crewCount >= MINIMUM_CREW_COUNT)
    )
  }

  get timeIntervalDisplay() {
    const { settings } = this.props

    if (settings.min_rental_hours === settings.max_rental_hours) {
      return settings.min_rental_hours
    } else {
      return `${settings.min_rental_hours} to ${settings.max_rental_hours}`
    }
  }

  get calendarInstructions() {
    if (this.isMaintenanceType) {
      return 'Click and drag to select a time slot'
    } else {
      return `Click and drag to select a ${this.timeIntervalDisplay} hour time slot`
    }
  }

  get modalTitle() {
    const { editRental } = this.props

    if (editRental) {
      return 'Edit Rental'
    } else if (this.isMaintenanceType) {
      return 'Add Maintenance Period'
    } else {
      return 'Create Rental'
    }
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

    return myRentals.filter(isNotDeleted).filter(rental => rental.type === rentalTypes.STANDARD).some(rental => {
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
    const { selectedBoatId } = this.state

    const selectionStart = moment(rentalSelection.start)
    const selectionEnd = moment(rentalSelection.end)

    if (editRental) {
      // the saved time slot of the editing rental doesn't count for this validation
      allRentals = allRentals.filter(isNotDeleted).filter(rental => rental.id !== editRental.id)
    }

    const rentalsToCompare = allRentals.filter(isNotDeleted).filter(rental => rental.boatId === selectedBoatId)

    return rentalsToCompare.some((rental) => {
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
    } else if (rental.rentedBy === currentUser.id && rental.type === rentalTypes.STANDARD) {
      backgroundColor = 'purple' // one of the user's other rental slots
    } else if (rental.id) {
      backgroundColor = 'grey' // someone else's rental slot
    } else if (
      this.selectionOverlapsOtherRental(rental) ||
      this.rentalStartsInPast(rental) ||
      (this.isStandardType && this.alreadyRentedThisDay(rental)) ||
      (this.isStandardType && !this.selectedAllowedRentalInterval(rental))
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
    const { currentUser, editRental, rentalType } = this.props
    const { view, reason } = this.state

    const { name: boatName } = getBoatById(rental.boatId)

    let label, icon, details

    if (editRental && editRental.id === rental.id) {
      switch(rental.type) {
        case rentalTypes.MAINTENANCE:
          label = `Saved ${boatName} maintenance`
          details = rental.reason
          icon = <FaWrench/>
          break
        default: // standard
          label = 'Saved time slot'
          icon = <RiSailboatFill/>
      }
    } else if (rental.type === rentalTypes.STANDARD && rental.rentedBy === currentUser.id) {
      label = 'My rental'
      icon = <RiSailboatFill/>
    } else if (rental.id && rental.type === rentalTypes.MAINTENANCE) {
      label = `${boatName} maintenance`
      details = rental.reason
      icon = <FaWrench/>
    } else if (rental.id && rental.type === rentalTypes.STANDARD) {
      label = 'Rented out'
      icon = <FaBan/>
    } else if (this.isStandardType && this.alreadyRentedThisDay(rental)) {
      label = `You've rented the ${this.getBlockingBoatName(rental)} for today already`
      icon = <FaExclamationTriangle/>
    } else if (this.selectionOverlapsOtherRental(rental)) {
      label = 'Boat unavailable at this time'
      icon = <FaExclamationTriangle/>
    } else if (this.rentalStartsInPast(rental)) {
      label = 'Please select a time slot in the future'
      icon = <FaExclamationTriangle/>
    } else if (this.isStandardType && !this.selectedAllowedRentalInterval(rental)) {
      label = `Please select a ${this.timeIntervalDisplay} hour time slot`
      icon = <FaExclamationTriangle/>
    } else if (editRental && !rental.id) {
      switch(rentalType) {
        case rentalTypes.MAINTENANCE:
          label = `Updated ${boatName} maintenance`
          details = reason
          icon = <FaWrench/>
          break
        default: // standard
          label = 'Updated time slot'
          icon = <RiSailboatFill/>
      }
    } else if (this.isMaintenanceType) {
      label = `${boatName} maintenance`
      details = reason
      icon = <FaWrench/>
    } else {
      label = `Sailing on the ${boatName}`
      icon = <RiSailboatFill/>
    }

    const showSvgComponent = view === 'day' || this.getRentalDurationHours(rental) >= 3 // Can't see full svg unless duration is at least 3 hours

    return (
      <EventLabel
        label={view === 'day' ? label : null}
        details={details}
        rental={rental}
        svgComponent={showSvgComponent ? icon : null}
        view={view}
        onMonthViewEventClick={this.handleMonthViewEventClick.bind(this)}
      />
    )
  }

  render() {
    const {
      currentUser,
      show,
      boats,
      editRental,
      onRentalAdd
    } = this.props

    const {
      selectedBoatId,
      newRentalPeriod,
      crewCount,
      reason,
      view,
      date,
      paypalButtonReady
    } = this.state

    const that = this

    return (
      <Modal show={show} onHide={this.resetAndHide.bind(this)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{this.modalTitle}</Modal.Title>
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
                {this.isMaintenanceType ?
                  <React.Fragment>
                    {/* Reason input */}
                    <Form.Label><b>Reason</b> (optional)</Form.Label>
                    <Form.Control
                      type='text'
                      value={reason}
                      onChange={(e) => this.setState({ reason: e.target.value })}
                    />
                  </React.Fragment>
                  :
                  <React.Fragment>
                    {/* Crew Members input */}
                    <Form.Label><b>Crew Members</b> <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                      type='number'
                      value={crewCount}
                      onChange={(e) => this.setState({ crewCount: e.target.value })}
                    />
                  </React.Fragment>
                }
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>

        <div style={{ padding: '0 1em' }}>
          <Form.Label><b>{this.calendarInstructions}</b> <span style={{ color: 'red' }}>*</span></Form.Label>
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
            justifyContent: editRental || this.isMaintenanceType ? 'flex-end' : 'center',
            borderTop: 'none'
          }}
        >
          {/* Blocking overlay */}
          {(!this.validRental || !paypalButtonReady) && !editRental && this.isStandardType &&
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

          {!editRental && this.isStandardType ?
            <PayPalButton
              amount={this.selectedBoatRentalPrice}
              shippingPreference='NO_SHIPPING' // default is 'GET_FROM_FILE'
              onApprove={async (data, actions) => {
                // Authorize the transaction
                const authorization = await actions.order.authorize()

                // Get the authorization id
                const authorizationId = authorization.purchase_units[0]
                  .payments.authorizations[0].id

                const { payer, purchase_units } = authorization
                const { amount, payee } = purchase_units[0]

                const { orderID, payerID,  } = data

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
                  orderId: orderID,
                  amount: amount.value,
                  currency: amount.currency_code,
                  payerId: payerID,
                  payerCountryCode: payer.address.country_code,
                  payerPostalCode: payer.address.postal_code || '',
                  payerEmailAddress: payer.email_address || '',
                  // payerPhone: payer.phone.phone_number.national_number,
                  payerGivenName: payer.name.given_name,
                  payerSurname: payer.name.surname,
                  payeeEmail: payee.email_address,
                  payeeMerchantId: payee.merchant_id,
                  paypalAuthorizationId: authorizationId
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
                disableFunding: 'paylater',
                intent: 'authorize'
              }}
              onButtonReady={() => that.setState({ paypalButtonReady: true })}
              onShippingChange={() => { return '' }} // Just having this prop forces all payment forms to render in popups instead of inline
            />
            :
            <React.Fragment>
              <Button variant='secondary' onClick={this.resetAndHide.bind(this)}>
                Cancel
              </Button>

              {editRental ?
                <Button
                  variant='primary'
                  disabled={!this.validRental}
                  onClick={this.handleSaveChanges.bind(this)}
                >
                  Save Changes
                </Button>
                :
                <Button
                  variant='primary'
                  disabled={!this.validRental}
                  onClick={this.handleAddMaintenance.bind(this)}
                >
                  Add Maintenance
                </Button>
              }

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
  const { settings } = state.settings

  return { currentUser, boats, myRentals, allRentals, settings }
}

export default connect(
  mapStateToProps,
  null
)(AddRentalModal)

AddRentalModal.propTypes = {
  editRental: PropTypes.object,
  show: PropTypes.bool,
  rentalType: PropTypes.oneOf(Object.values(rentalTypes)),
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}

AddRentalModal.defaultProps = {
  rentalType: rentalTypes.STANDARD
}
