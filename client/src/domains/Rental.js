const rentalTypes = {
  STANDARD: 'standard',
  MAINTENANCE: 'maintenance',
  KLASS: 'klass'
}

/**
 * @param {string} rentalType 'standard'
 * @returns {boolean}
 */
const isStandardType = (rentalType) => rentalType === rentalTypes.STANDARD

export default {
  rentalTypes,
  isStandardType
}
