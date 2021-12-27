const ClassesDao = require('../dao/ClassesDao')
const ClassRegistrationDao = require('../dao/ClassRegistrationsDao')

const ValidationError = require('../errors/ValidationError')

/**
 * Runs a series of validations on incoming class registration dto object
 * @param {ClassRegistrationDto} classRegistration the proposed new rental object
 * @returns {Promise<{}>} validation object
 */
exports.validateClassRegistration = async (classRegistration) => {
  const { classId } = classRegistration

  const capacityValidated = await validateCapacity(classId)

  if (!capacityValidated) {
    throw new ValidationError('Class is completely full')
  }

  // TODO: validate that you don't sign up for class twice
}

/**
 * We need to make sure that there's enough room in the class before
 * @param classId
 * @returns {boolean} true if there's enough capacity in the class
 */
async function validateCapacity(classId) {
  const { capacity } = await ClassesDao.getById(classId)

  const registrationCount = await ClassRegistrationDao.getRegistrationCountByClassId(classId)

  console.log('capacity', capacity)
  console.log('registrationCount', registrationCount)

  return capacity - registrationCount > 0
}