import moment from 'moment'

const getEventDurationHours = ({ start, end }) => {
  const duration = moment.duration(moment(end).diff(moment(start)))

  /*
   * Sometimes duration.asHours() gives a result like 2.9999, probably as a
   * result of a bug with react-big-calendar. This rounds to the nearest 100th
   * to adjust for this issue
   */
  return Math.round((duration.asHours() + Number.EPSILON) * 100) / 100
}

const hasStartAndEnd = (event) => {
  return event.start !== null && event.end !== null
}

const splitUpcomingAndPast = (events) => {
  const upcomingEvents = []
  const pastEvents = []

  events.forEach((event) => {
    if (moment(event.end).isAfter()) {
      upcomingEvents.push(event)
    } else {
      pastEvents.push(event)
    }
  })

  return { upcomingEvents, pastEvents }
}

const clearStartEnd = (event) => {
  return { ...event, start: null, end: null }
}

export default {
  getEventDurationHours,
  hasStartAndEnd,
  splitUpcomingAndPast,
  clearStartEnd
}
