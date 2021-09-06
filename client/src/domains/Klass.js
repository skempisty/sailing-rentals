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

export default {
  getRegisteredCount
}
