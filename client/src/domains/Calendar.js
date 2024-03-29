import Event from '../domains/Event'

import isNotDeleted from '../utils/isNotDeleted'

const viewTypes = {
  MONTH: 'month',
  DAY: 'day'
}

/**
 * Supplies events suitable for React Big Calendar. combines the transient newEvent and any relevant events
 * and ensures that only usable events will be returned.
 * @param {Object} newEvent if the calendar is supposed to include a new event period selection, we
 * can include it here. Must include a { start, end } property.
 * @param {Object[]} events any array of objects that all have { start, end } properties
 * @returns {Object[]}
 */
const getEventsForCalendar = (newEvent, events) => {
  const newEventWithFlag = { ...newEvent, isNewEvent: true }

  /*
   * We want to NEVER show
   * - deleted events
   * - events without a start AND end value
   */
  const filteredEvents = [ newEventWithFlag, ...events ]
    .filter(isNotDeleted)
    .filter(Event.hasStartAndEnd)

  // event start/end times must be Date objects for React Big Calendar
  return filteredEvents.map(event => {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }
  })
}

export default {
  viewTypes,
  getEventsForCalendar
}
