/**
 * IMPORTANT
 * Maintain the values in this file along with src/utils/constants.js
 */

const rentalTypes = {
    STANDARD: 'standard',
    MAINTENANCE: 'maintenance',
    KLASS: 'klass'
}

const siteColors = {
    blue: '#004679',
    gold: '#fec307',
    white: '#ffffff',
    darkGrey: '#343a40',
    orange: '#E07C3A'
}

module.exports = {
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000',
    rentalTypes,
    siteColors
}
