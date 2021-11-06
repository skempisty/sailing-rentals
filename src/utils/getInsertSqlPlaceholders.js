/**
 *
 * @param {Array} insertArray
 * @returns {string}
 */
const getInsertSqlPlaceholders = (insertArray) => {
  if (insertArray[0] && typeof insertArray[0] === 'object') {
    // Array of arrays
    return insertArray.map(arr => {
      return `(${new Array(arr.length).fill('?').join(', ')})`
    }).join(', ')
  } else {
    // Array of strings
    return `(${new Array(insertArray.length).fill('?').join(', ')})`
  }
}

module.exports = getInsertSqlPlaceholders