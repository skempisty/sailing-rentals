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
  validate
}
