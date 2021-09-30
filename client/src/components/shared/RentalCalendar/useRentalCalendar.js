import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { FaBan, FaExclamationTriangle, FaWrench } from 'react-icons/fa'
import { RiSailboatFill } from 'react-icons/ri'

import EventLabel from './EventLabel'

import Rental from '../../../domains/Rental'
import Event from '../../../domains/Event'
import isNotDeleted from '../../../utils/isNotDeleted'

import getBoatById from '../../../store/orm/boats/getBoatById'

export const calendarViewTypes = {
  MONTH: 'month',
  DAY: 'day'
}

export const useRentalCalendar = (props) => {
  const {
    events,
    selectedBoatId,
    editEvent,
    rentalType,
    reason,
    onSelectSlot
  } = props

  console.log('editEvent', editEvent)

  const [newEvent, setNewEvent] = useState({})
  const [view, setView] = useState(calendarViewTypes.MONTH)
  const [calendarDate, setCalendarDate] = useState(editEvent && editEvent.start ? new Date(editEvent.start) : new Date())

  const { currentUser } = useSelector(state => state.session)
  const { myRentals } = useSelector(state => state.rentals)
  const { settings } = useSelector(state => state.settings)

  /**
   * Business rule: Users are not allowed to book more than one (1) standard boat rental per day.
   * @param rentalSelection
   * @param {Rental} myRentals
   * @param editEvent
   * @returns {boolean} True if rental selection violates this rule
   */
  const alreadyRentedThisDay = (rentalSelection) => {
    const selectionDate = {
      day: moment(rentalSelection.end).date(),
      month: moment(rentalSelection.end).month(),
      year: moment(rentalSelection.end).year()
    }

    const selectionDateString = JSON.stringify(selectionDate)

    let eventsCopy = [ ...events ]

    if (editEvent) {
      eventsCopy = eventsCopy.filter(rental => rental.id !== editEvent.id)
    }

    return eventsCopy
      .filter(isNotDeleted)
      // only standard rentals follow this rule
      .filter(rental => Rental.isStandardType(rental.type))
      /*
       * see if any of the existing rentals for this user
       * are on the same day as the given rental selection
       */
      .some(rental => {
        return selectionDateString === JSON.stringify({
          day: moment(rental.end).date(),
          month: moment(rental.end).month(),
          year: moment(rental.end).year()
        })
      })
  }

  const handleMonthViewEventClick = ({ start }) => {
    const eventMoment = moment(start)

    setCalendarDate(new Date(eventMoment.year(), eventMoment.month(), eventMoment.date()))
    setView(calendarViewTypes.DAY)
  }

  const timeIntervalDisplay = settings.min_rental_hours === settings.max_rental_hours ?
    settings.min_rental_hours
    :
    `${settings.min_rental_hours} to ${settings.max_rental_hours}`

  const getBlockingBoatName = (rental) => {
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

  const titleAccessor = (rental) => {
    const rentalBoat = getBoatById(rental.boatId)

    const boatName = rentalBoat && rentalBoat.name ? rentalBoat.name : ''

    let label, icon, details

    if (editEvent && editEvent.id === rental.id) {
      switch(rental.type) {
        case Rental.rentalTypes.MAINTENANCE:
          label = `Saved ${boatName} maintenance`
          details = rental.reason
          icon = <FaWrench/>
          break
        default: // standard
          label = 'Saved time slot'
          icon = <RiSailboatFill/>
      }
    } else if (rental.type === Rental.rentalTypes.STANDARD && rental.rentedBy === currentUser.id) {
      label = 'My rental'
      icon = <RiSailboatFill/>
    } else if (rental.id && rental.type === Rental.rentalTypes.MAINTENANCE) {
      label = `${boatName} maintenance`
      details = rental.reason
      icon = <FaWrench/>
    } else if (rental.id && rental.type === Rental.rentalTypes.STANDARD) {
      label = 'Rented out'
      icon = <FaBan/>
    } else if (Rental.isStandardType(rentalType) && alreadyRentedThisDay(rental)) {
      label = `You've rented the ${getBlockingBoatName(rental)} for today already`
      icon = <FaExclamationTriangle/>
    } else if (selectionOverlapsOtherRental(rental)) {
      label = 'Boat unavailable at this time'
      icon = <FaExclamationTriangle/>
    } else if (eventStartsInPast(rental)) {
      label = 'Please select a time slot in the future'
      icon = <FaExclamationTriangle/>
    } else if (Rental.isStandardType(rentalType) && !selectedAllowedRentalInterval(rental)) {
      label = `Please select a ${timeIntervalDisplay} hour time slot`
      icon = <FaExclamationTriangle/>
    } else if (editEvent && !rental.id) {
      switch(rentalType) {
        case Rental.rentalTypes.MAINTENANCE:
          label = `Updated ${boatName} maintenance`
          details = reason
          icon = <FaWrench/>
          break
        default: // standard
          label = 'Updated time slot'
          icon = <RiSailboatFill/>
      }
    } else if (rentalType === Rental.rentalTypes.MAINTENANCE) {
      label = `${boatName} maintenance`
      details = reason
      icon = <FaWrench/>
    } else {
      label = `Sailing on the ${boatName}`
      icon = <RiSailboatFill/>
    }

    const showSvgComponent = view === calendarViewTypes.DAY || Event.getEventDurationHours(rental) >= 3 // Can't see full svg unless duration is at least 3 hours

    return (
      <EventLabel
        label={view === calendarViewTypes.DAY ? label : null}
        details={details}
        rental={rental}
        svgComponent={showSvgComponent ? icon : null}
        view={view}
        onMonthViewEventClick={handleMonthViewEventClick}
      />
    )
  }

  const eventStyleGetter = (rental) => {
    let backgroundColor

    if (editEvent && editEvent.id === rental.id) {
      backgroundColor = 'dodgerblue' // one of the user's other rental slots
    } else if (rental.rentedBy === currentUser.id && rental.type === Rental.rentalTypes.STANDARD) {
      backgroundColor = 'purple' // one of the user's other rental slots
    } else if (rental.id) {
      backgroundColor = 'grey' // someone else's rental slot
    } else if (
      selectionOverlapsOtherRental(rental) ||
      eventStartsInPast(rental) ||
      (Rental.isStandardType(rentalType) && alreadyRentedThisDay(rental)) ||
      (Rental.isStandardType(rentalType) && !selectedAllowedRentalInterval(rental))
    ) {
      backgroundColor = 'red' // invalid time slot selection
    } else {
      backgroundColor = 'green' // valid time slot selection
    }

    // event relative size
    const width = `${(rental.end - rental.start) / (maxTime() - minTime()) * 100}%`

    // positioning
    const minTimeDate = minTime().setFullYear(rental.start.getFullYear(), rental.start.getMonth(), rental.start.getDate())

    const left = `${(rental.start - minTimeDate) / (maxTime() - minTime()) * 100}%`

    const style = {
      position: view === calendarViewTypes.MONTH ? 'relative' : null,
      left: view === calendarViewTypes.MONTH ? left : null,
      width: view === calendarViewTypes.MONTH ? width : null,
      backgroundColor
    }

    return { style }
  }

  const eventStartsInPast = (event) => {
    if (!event.start) return true

    return moment(event.start).isBefore()
  }

  /**
   * Determines if the selected time slot
   * overlaps an existing rental on the same boat
   */
  const selectionOverlapsOtherRental = () => {
    const eventStart = moment(newEvent.start)
    const eventEnd = moment(newEvent.end)

    let eventsCopy = [ ...events ]

    if (editEvent) {
      // the saved time slot of the editing rental doesn't count for this validation
      eventsCopy = eventsCopy.filter(isNotDeleted).filter(rental => rental.id !== editEvent.id)
    }

    const rentalsToCompare = eventsCopy.filter(isNotDeleted).filter(rental => rental.boatId === selectedBoatId)

    return rentalsToCompare.some((rental) => {
      const rentalStart = moment(rental.start)
      const rentalEnd = moment(rental.end)

      const selectionIsBefore = eventStart.isSameOrBefore(rentalStart) && eventEnd.isSameOrBefore(rentalStart)
      const selectionIsAfter = eventStart.isSameOrAfter(rentalEnd) && eventEnd.isSameOrAfter(rentalEnd)

      return !(selectionIsBefore || selectionIsAfter)
    })
  }

  const selectedAllowedRentalInterval = (rental) => {
    const { min_rental_hours, max_rental_hours } = settings

    const selectedRentalInterval = Event.getEventDurationHours(rental)

    return (
      selectedRentalInterval >= min_rental_hours &&
      selectedRentalInterval <= max_rental_hours
    )
  }

  const minTime = () => {
    const minTime = new Date()
    minTime.setHours(7,0,0)

    return minTime
  }

  const maxTime = () => {
    const maxTime = new Date()
    maxTime.setHours(20,0,0)

    return maxTime
  }

  const handleSelectSlot = (e) => {
    const { start, end, slots } = e

    const clickMoment = moment(slots[0])

    const isSingleDateClick = slots.length === 1 && clickMoment.hour() === 0
    const isDayRangeSelect = moment(start).hour() !== 0

    if (isSingleDateClick) {
      // drill down to clicked day on calendar
      setView(calendarViewTypes.DAY)
      setCalendarDate(new Date(clickMoment.year(), clickMoment.month(), clickMoment.date()))
    } else if (isDayRangeSelect) {
      onSelectSlot({ start, end })
    }
  }

  return {
    calendarViewTypes,
    titleAccessor,
    eventStyleGetter,
    view, setView,
    calendarDate, setCalendarDate,
    newEvent, setNewEvent,
    minTime, maxTime,
    handleSelectSlot
  }
}

export default useRentalCalendar