import isNotDeleted from '../utils/isNotDeleted'

/**
 * @param {User[]} users put the users array from redux in here
 */
const getInstructors = (users) => users.filter(user => user.isInstructor).filter(isNotDeleted)

/**
 * Sometimes we need to display a user's full name
 * @param {User} user object
 * @returns {string} the full name of the user
 */
const buildUserFullName = (user) => `${user.firstName} ${user.lastName}`

export default {
  getInstructors,
  buildUserFullName
}
