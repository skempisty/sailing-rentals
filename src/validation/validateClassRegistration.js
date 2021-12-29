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

  const costValidated = await validateClassCost(classRegistration)

  if (!costValidated) {
    throw new ValidationError('Amount authorized to paypal does not match the class price')
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

  return capacity - registrationCount > 0
}

/**
 * This prevents a clever user from purchasing a class registration with the wrong cost
 * @param {ClassRegistrationDto} classRegistrationDto
 * @returns {boolean} true if amount authorized to paypal actually matches the price of the class
 */
async function validateClassCost(classRegistrationDto) {
  if (!classRegistrationDto.payPalData) return true

  const { classId, payPalData: { authorization }} = classRegistrationDto

  const { purchase_units } = authorization
  const { amount: { value: paypalAmount } } = purchase_units[0]

  const { price } = await ClassesDao.getById(classId)

  const normalizedClassPrice = Number(price).toFixed(2)
  const normalizedAuthorizedPaypalAmount = Number(paypalAmount).toFixed(2)

  return normalizedClassPrice === normalizedAuthorizedPaypalAmount
}