import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { rentalTypes } from '../../../utils/constants'

import useRentalCalendar from './useRentalCalendar'

const StyledCalendar = styled.div`
  .rbc-calendar { padding: 0 1em 1em 1em; }

  .rbc-time-slot { min-height: 3em; }
  
  .rbc-event-content { overflow: visible }
  
  .rbc-toolbar {
    span.rbc-btn-group,
    span.rbc-toolbar-label {
      margin-bottom: 0.5em;
    }
  }
`

const localizer = momentLocalizer(moment)

const RentalCalendar = (props) => {
  const { events } = props

  const {
    view, setView,
    calendarDate, setCalendarDate,
    titleAccessor, eventStyleGetter,
    minTime, maxTime,
    calendarViewTypes,
    handleSelectSlot
  } = useRentalCalendar(props)

  console.log('events', events)

  return (
    <StyledCalendar>
      <Calendar
        localizer={localizer}
        style={{ height: '30em', marginTop: '1em' }}
        views={Object.values(calendarViewTypes)}
        timeslots={1}
        selectable
        view={view}
        date={calendarDate}
        events={events}
        longPressThreshold={100}
        min={minTime()} // set earliest time visible on calendar
        max={maxTime()} // set latest time visible on calendar
        eventPropGetter={(e) => eventStyleGetter(e)}
        titleAccessor={(e) => titleAccessor(e)}
        onView={(view) => setView(view)} // fires when one of the view buttons is pressed
        onNavigate={(newDate) => setCalendarDate(newDate)}
        onSelectSlot={handleSelectSlot}
      />
    </StyledCalendar>
  )
}

RentalCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  rentalType: PropTypes.oneOf([rentalTypes.STANDARD, rentalTypes.MAINTENANCE, rentalTypes.KLASS]),
  selectedBoatId: PropTypes.number,
  editEvent: PropTypes.object,
  reason: PropTypes.string,
  onSelectSlot: PropTypes.func.isRequired
}

RentalCalendar.defaultProps = {
  rentalType: rentalTypes.STANDARD
}

export default RentalCalendar
