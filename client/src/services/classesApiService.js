import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

/**
 * @typedef Class
 * @type {object}
 * @property {number} id
 * @property {number} instructorId
 * @property {string} details
 * @property {number} capacity
 * @property {number} price
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {ClassMeeting[]} classMeetings
 */

/**
 * @typedef ClassMeeting
 * @type {object}
 * @property {number} id
 * @property {number} classId
 * @property {number} instructorId
 * @property {number} rentalId
 * @property {string} name
 * @property {string} details
 * @property {boolean} usesBoat
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const classesApiService = () => {
  /**
   * ░██████╗░███████╗████████╗
   * ██╔════╝░██╔════╝╚══██╔══╝
   * ██║░░██╗░█████╗░░░░░██║░░░
   * ██║░░╚██╗██╔══╝░░░░░██║░░░
   * ╚██████╔╝███████╗░░░██║░░░
   * ░╚═════╝░╚══════╝░░░╚═╝░░░
   */

  /**
   * @returns {Promise<Class[]>}
   */
  const getClasses = async () => {
    const url = `${Constants.baseUrl}/api/classes`

    return await fetchAndCheckStatus(url)
  }

  /**
   * @param {number} id
   * @returns {Promise<Class>}
   */
  const getClass = async (id) => {
    const url = `${Constants.baseUrl}/api/classes/${id}`

    return await fetchAndCheckStatus(url)
  }

  /**
   * ██████╗░░█████╗░░██████╗████████╗
   * ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
   * ██████╔╝██║░░██║╚█████╗░░░░██║░░░
   * ██╔═══╝░██║░░██║░╚═══██╗░░░██║░░░
   * ██║░░░░░╚█████╔╝██████╔╝░░░██║░░░
   * ╚═╝░░░░░░╚════╝░╚═════╝░░░░╚═╝░░░
   */

  /**
   *
   * @param {Class} classObj
   * @returns {Promise<Class>}
   */
  const createClass = async (classObj) => {
    const url = `${Constants.baseUrl}/api/classes`

    const expectedStatuses = [ 200 ]

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(classObj)
    }

    return await fetchAndCheckStatus(url, expectedStatuses, postOptions)
  }

  /**
   * ██████╗░██╗░░░██╗████████╗
   * ██╔══██╗██║░░░██║╚══██╔══╝
   * ██████╔╝██║░░░██║░░░██║░░░
   * ██╔═══╝░██║░░░██║░░░██║░░░
   * ██║░░░░░╚██████╔╝░░░██║░░░
   * ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░
   */

  /**
   * @param {number} id the class id we want to update
   * @param {Class} updatedClassObj
   * @returns {Promise<Class>}
   */
  const updateClass = async (id, updatedClassObj) => {
    const url = `${Constants.baseUrl}/api/classes/${id}`

    const expectedStatuses = [ 200 ]

    const putOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(updatedClassObj)
    };

    return await fetchAndCheckStatus(url, expectedStatuses, putOptions)
  }

  /**
   * ██████╗░███████╗██╗░░░░░███████╗████████╗███████╗
   * ██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝
   * ██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░
   * ██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░
   * ██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗
   * ╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝
   */

  const deleteClass = async (id) => {
    const url = `${Constants.baseUrl}/api/classes/${id}`

    const expectedStatuses = [ 200 ]

    const deleteOptions = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      }
    }

    return await fetchAndCheckStatus(url, expectedStatuses, deleteOptions)
  }

  return {
    // GET
    getClasses,
    getClass,
    // POST
    createClass,
    // PUT
    updateClass,
    // DELETE
    deleteClass
  }
}

export default classesApiService
