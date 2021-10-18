/**
 * @typedef {import('moment').Moment} Moment
 */

import moment from 'moment'

const getRegisteredCount = (classId, classRegistrations) => {
  let count = 0

  // find how many registrations are for the class with classId
  classRegistrations.forEach((registration) => {
    if (registration.classId === classId) {
      count++
    }
  })

  return count
}

/**
 * Given a Klass object, determine when the earliest meeting start and latest meeting end is.
 * @param {Klass} klass
 * @returns {{startTime: Moment, endTime: Moment}} returns as moments not strings
 */
const getStartEndTimes = (klass) => {
  const meetings = klass.classMeetings

  let startTime = ''
  let endTime = ''

  for (const mtg of meetings) {
    const mtgStart = moment(mtg.start)
    const mtgEnd = moment(mtg.end)

    // earliest meeting START is startTime
    if (!startTime || mtgStart.isBefore(startTime)) {
      startTime = mtgStart
    }

    // latest meeting END is endTime
    if (!endTime || mtgEnd.isAfter(endTime)) {
      endTime = mtgEnd
    }
  }

  return {
    startTime,
    endTime
  }
}

const getClassById = (classId, classes) => {
  const classIndex = classes.findIndex(klass => klass.id === klass.id)

  return classes[classIndex]
}

const validate = (classObj) => {
  const {
    capacity,
    price,
    meetings
  } = classObj

  // validate class meetings
  const meetingsAreValid = meetings.every(mtg => {
    const { instructorId, boatId, start, end } = mtg

    return (
      instructorId > -1 &&
      boatId !== -1 && // indicates a boat is used in this mtg, but no boat was chosen
      start !== null && end !== null
    )
  })

  return (
    capacity > 0 &&
    price >= 0 &&
    meetingsAreValid
  )
}

export default {
  getRegisteredCount,
  getClassById,
  getStartEndTimes,
  validate
}
