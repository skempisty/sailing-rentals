import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

import { Button, Form, Modal, Dropdown, Col } from 'react-bootstrap'

import Flex from '../../shared/styled-system/Flex'
import RentalCalendar from '../RentalCalendar'
import PaypalButtons from '../PayPalButtons'
import SailingRentalPriceBreakdown from '../SailingRentalPriceBreakdown'

import Event from '../../../domains/Event'
import Calendar from '../../../domains/Calendar'
import Rental from '../../../models/Rental'
import Payment from '../../../models/Payment'
import isNotDeleted from '../../../utils/isNotDeleted'
import usingTouchDevice from '../../../utils/usingTouchDevice'
import { rentalTypes } from '../../../utils/constants'
import { breakpoints } from '../../../config'

import getBoatById from '../../../store/orm/boats/getBoatById'

const StyledInstructions = styled.div`
  div.calendar-instructions {
    text-align: center;
  }
  
  @media only screen and (min-width: ${breakpoints.headerExpand}) {
    div.calendar-instructions {
      text-align: left;
    }
  }
`

class AddRentalModal extends React.Component {
  constructor(props) {
    super(props)

    this.usingTouchDevice = usingTouchDevice()

    this.state = this.initialState
  }

  get initialState() {
    const { editRental } = this.props

    return {
      selectedBoatId: editRental ? editRental.boatId : -1,
      crewCount: editRental ? editRental.crewCount : 0,
      reason: editRental ? editRental.reason || '' : '',
      view: Calendar.viewTypes.MONTH,
      date: editRental ? new Date(editRental.start) : new Date(),
      newRentalPeriod: {},
      selectionIsValid: false,
      paypalButtonReady: false
    }
  }

  handleSelectSlot(e) {
    const { selectedBoatId } = this.state
    const { start, end, isValid } = e

    const newRentalPeriod = {
      start,
      end,
      boatId: selectedBoatId
    }

    this.setState({
      newRentalPeriod,
      selectionIsValid: isValid
    })
  }

  handleBoatSelect(id) {
    const { selectedBoatId } = this.state

    // only change state if selected boat changes
    if (id !== selectedBoatId) {
      this.setState({
        selectedBoatId: id,
        newRentalPeriod: {},
        selectionIsValid: false
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

    this.resetAndHide()
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

  resetAndHide() {
    const { onHide } = this.props

    this.setState(this.initialState)
    onHide()
  }

  get rentals() {
    const { allRentals } = this.props
    const { newRentalPeriod, selectedBoatId } = this.state

    if (!selectedBoatId) return []

    const rentalsForBoat = allRentals.filter(rental => rental.boatId === selectedBoatId)

    const { upcomingEvents } = Event.splitUpcomingAndPast(rentalsForBoat)

    return Calendar.getEventsForCalendar(newRentalPeriod, upcomingEvents)
  }

  get selectedBoatRentalPrice() {
    const { newRentalPeriod, selectedBoatId } = this.state

    if (selectedBoatId < 0) return ''

    const hoursRented = this.getRentalDurationHours(newRentalPeriod)

    return (this.boatPricePerHour * hoursRented).toFixed(2)
  }

  get boatPricePerHour() {
    const { selectedBoatId } = this.state

    if (selectedBoatId < 0) return ''

    const boat = getBoatById(selectedBoatId)

    return boat.perHourRentalCost
  }

  get boatName() {
    const { selectedBoatId } = this.state

    if (selectedBoatId < 0) return ''

    const boat = getBoatById(selectedBoatId)

    return boat.name
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

    const {
      selectedBoatId,
      crewCount,
      selectionIsValid
    } = this.state

    return (
      !!selectedBoatId && // must have a boat selected
      selectionIsValid && // selection has to be valid
      (this.isMaintenanceType || crewCount >= MINIMUM_CREW_COUNT) // must either be maintenance type or have the minimum crew count
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
    const { view } = this.state
    const { usingTouchDevice } = this

    const actionVerb = usingTouchDevice ? 'Press/hold' : 'Click'

    if (view === Calendar.viewTypes.MONTH) {
      return `${actionVerb} to choose a day`
    } else if (this.isMaintenanceType) {
      return `${actionVerb} and drag to select a time slot`
    } else {
      return `${actionVerb} and drag to select a ${this.timeIntervalDisplay} hour time slot`
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

  render() {
    const {
      currentUser,
      show,
      boats,
      editRental,
      rentalType,
      onRentalAdd
    } = this.props

    const {
      selectedBoatId,
      newRentalPeriod,
      crewCount,
      reason,
      paypalButtonReady,
      selectionIsValid
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
                      {selectedBoatId >= 0 ? getBoatById(selectedBoatId).name : 'Select a boat'}
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

        <StyledInstructions>
          <div className='calendar-instructions' style={{ padding: '0.5em 1em 0 1em', background: !selectedBoatId ? 'rgba(0,0,0,0.5)' : '' }}>
            <Form.Label><b>{this.calendarInstructions}</b> <span style={{ color: 'red' }}>*</span></Form.Label>
          </div>
        </StyledInstructions>

        <RentalCalendar
          selectedBoatId={selectedBoatId}
          events={this.rentals}
          editEvent={editRental}
          rentalType={rentalType}
          disabled={selectedBoatId < 0}
          disabledMsg='Select a boat first!'
          reason={reason}
          onSelectSlot={this.handleSelectSlot.bind(this)}
        />

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
            <Flex width='100%' margin='0 10em' justifyContent={selectionIsValid ? 'space-between' : 'center'} alignItems='flex-start'>
              {selectionIsValid &&
                <SailingRentalPriceBreakdown
                  boatName={this.boatName}
                  boatPricePerHour={this.boatPricePerHour}
                  hoursToRent={this.getRentalDurationHours(newRentalPeriod)}
                />
              }

              <PaypalButtons
                amount={this.selectedBoatRentalPrice}
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
                onButtonRdy={() => that.setState({ paypalButtonReady: true })}
              />
            </Flex>
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
