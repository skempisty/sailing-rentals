import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { FaBan, FaExclamationTriangle, FaWrench, FaUsers, FaUserSlash } from 'react-icons/fa'
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

  const [view, setView] = useState(calendarViewTypes.MONTH)
  const [calendarDate, setCalendarDate] = useState(editEvent && editEvent.start ? new Date(editEvent.start) : new Date())

  const { currentUser } = useSelector(state => state.session)
  const { myRentals } = useSelector(state => state.rentals)
  const { settings } = useSelector(state => state.settings)

  /**
   * Business rule: Users are not allowed to book more than one (1) standard boat rental per day.
   * @param rentalSelection
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

  const eventStartsInPast = (event) => {
    if (!event.start) return true

    return moment(event.start).isBefore()
  }

  /**
   * Determines if the selected time slot
   * overlaps an existing rental on the same boat
   */
  const selectionOverlapsOtherRental = (event) => {
    const eventStart = moment(event.start)
    const eventEnd = moment(event.end)

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

  const getEventBackgroundColor = (event) => {
    switch (rentalType) {
      case Rental.rentalTypes.STANDARD:
        if (editEvent && editEvent.id === event.id) {
          return 'dodgerblue' // one of the user's other rental slots
        } else if (event.rentedBy === currentUser.id && event.type === Rental.rentalTypes.STANDARD) {
          return 'purple' // one of the user's other rental slots
        } else if (event.id) {
          return 'grey' // someone else's rental slot
        } else if (
          selectionOverlapsOtherRental(event) ||
          eventStartsInPast(event) ||
          (alreadyRentedThisDay(event)) ||
          (selectedAllowedRentalInterval(event))
        ) {
          return 'red' // invalid time slot selection
        } else {
          return 'green' // valid time slot selection
        }
      case Rental.rentalTypes.MAINTENANCE:
        if (editEvent && editEvent.id === event.id) {
          return 'dodgerblue' // one of the user's other rental slots
        } else if (event.rentedBy === currentUser.id && event.type === Rental.rentalTypes.STANDARD) {
          return 'purple' // one of the user's other rental slots
        } else if (event.id) {
          return 'grey' // someone else's rental slot
        } else if (
          selectionOverlapsOtherRental(event) ||
          eventStartsInPast(event)
        ) {
          return 'red' // invalid time slot selection
        } else {
          return 'green' // valid time slot selection
        }
      case Rental.rentalTypes.KLASS:
        if (!event.isNewEvent && editEvent && editEvent.id === event.id) {
          return 'dodgerblue' // this is the class meeting being edited on this Calendar
        } else if (!event.isNewEvent && event.classId === editEvent.classId) {
          return 'purple'  // these are the other meetings in the class
        } else if (!event.isNewEvent && event.id) {
          return 'grey'
        } else if (
          selectionOverlapsOtherRental(event) ||
          eventStartsInPast(event)
        ) {
          return 'red' // invalid meeting time slot selection
        } else {
          return 'green' // valid meeting time slot selection
        }
      default:
        return 'red'
    }
  }

  const eventStyleGetter = (rental) => {
    const backgroundColor = getEventBackgroundColor(rental)

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

  const titleAccessor = (event) => {
    const rentalBoat = getBoatById(event.boatId)
    const boatName = rentalBoat && rentalBoat.name ? rentalBoat.name : ''

    let label, icon, details

    // Can't see full svg on calendar unless duration is at least 3 hours
    const showSvgComponent = view === calendarViewTypes.DAY || Event.getEventDurationHours(event) >= 3

    switch (rentalType) {
      case Rental.rentalTypes.STANDARD:
        if (editEvent && editEvent.id === event.id) {
          label = 'Saved time slot'
          icon = <RiSailboatFill/>
        } else if (event.type === Rental.rentalTypes.STANDARD && event.rentedBy === currentUser.id) {
          label = 'My rental'
          icon = <RiSailboatFill/>
        } else if (event.id && event.type === Rental.rentalTypes.MAINTENANCE) {
          label = `${boatName} maintenance`
          details = event.reason
          icon = <FaWrench/>
        } else if (event.id && event.type === Rental.rentalTypes.STANDARD) {
          label = 'Rented out'
          icon = <FaBan/>
        } else if (Rental.isStandardType(rentalType) && alreadyRentedThisDay(event)) {
          label = `You've rented the ${getBlockingBoatName(event)} for today already`
          icon = <FaExclamationTriangle/>
        } else if (selectionOverlapsOtherRental(event)) {
          label = 'Boat unavailable at this time'
          icon = <FaExclamationTriangle/>
        } else if (eventStartsInPast(event)) {
          label = 'Please select a time slot in the future'
          icon = <FaExclamationTriangle/>
        } else if (Rental.isStandardType(rentalType) && !selectedAllowedRentalInterval(event)) {
          label = `Please select a ${timeIntervalDisplay} hour time slot`
          icon = <FaExclamationTriangle/>
        } else if (editEvent && !event.id) {
          label = 'Updated time slot'
          icon = <RiSailboatFill/>
        } else {
          label = `Sailing on the ${boatName}`
          icon = <RiSailboatFill/>
        }

        break
      case Rental.rentalTypes.MAINTENANCE:
        if (editEvent && editEvent.id === event.id) {
          label = `Saved ${boatName} maintenance`
          details = event.reason
          icon = <FaWrench/>
        } else if (editEvent && !event.id) {
          label = `Updated ${boatName} maintenance`
          details = reason
          icon = <FaWrench/>
        } else {
          label = `${boatName} maintenance`
          details = reason
          icon = <FaWrench/>
        }

        break
      case Rental.rentalTypes.KLASS:
        if (!event.isNewEvent && editEvent && editEvent.id === event.id) {
          /**
           * Blue
           */
          // this is the class meeting being edited on this Calendar
          label = selectedBoatId ? `Saved Meeting Time Aboard ${boatName}` : 'New Meeting Time'
          details = event.name
          icon = selectedBoatId ? <RiSailboatFill/> : <FaUsers/>
        } else if (!event.isNewEvent && event.classId === editEvent.classId) {
          /**
           * Purple
           */
          label = 'Meeting In This Class'
          label = selectedBoatId ? `Meeting In This Class Aboard ${boatName}` : 'Meeting In This Class'
          details = event.name
          icon = selectedBoatId ? <RiSailboatFill/> : <FaUsers/>
        } else if (!event.isNewEvent && event.id) {
          /**
           * Grey
           */
          label = `${boatName} Reserved`

          switch (event.type) {
            case Rental.rentalTypes.STANDARD:
              details = `Rented by: ${event.rentedBy}`
              icon = <RiSailboatFill/>
              break
            case Rental.rentalTypes.MAINTENANCE:
              details = event.reason
              icon = <FaWrench/>
              break
            /*
             * You won't find a KLASS type event that should
             * be displayed with GREY condition on KLASS rentalType
             */
            default:
          }
        } else if (
          selectionOverlapsOtherRental(event) ||
          eventStartsInPast(event)
        ) {
          /**
           * Red
           */
          label = `Invalid Meeting Time`
          icon = <FaUserSlash/>
        } else {
          /**
           * Green
           */
          label = selectedBoatId ? `New Meeting Time Aboard ${boatName}` : 'New Meeting Time'
          details = event.name
          icon = selectedBoatId ? <RiSailboatFill/> : <FaUsers/>
        }

        break
      default:
    }

    return (
      <EventLabel
        label={view === calendarViewTypes.DAY ? label : null}
        details={details}
        rental={event}
        svgComponent={showSvgComponent ? icon : null}
        view={view}
        onMonthViewEventClick={handleMonthViewEventClick}
      />
    )
  }

  return {
    calendarViewTypes,
    titleAccessor,
    eventStyleGetter,
    view, setView,
    calendarDate, setCalendarDate,
    minTime, maxTime,
    handleSelectSlot
  }
}

export default useRentalCalendar