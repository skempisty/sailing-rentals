/**
 * IMPORTANT
 * Maintain the values in this file along with src/utils/constants.js
 */

const rentalTypes = {
    STANDARD: 'standard',
    MAINTENANCE: 'maintenance'
}

module.exports = {
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000',
    rentalTypes
}
