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

export default {
  getRegisteredCount,
  getClassById
}
