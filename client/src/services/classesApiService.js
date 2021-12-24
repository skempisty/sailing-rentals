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
 * @property {ClassMeeting[]} meetings
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

/**
 * @typedef ClassRegistration
 * @type {object}
 * @property {number} userId
 * @property {number} classId
 */

/**
 * @typedef ClassRegistrationPayload
 * @type {object}
 * @property {number} classId
 * @property {PayPalData} payPalData
 */

/**
 * @typedef PayPalData Information from PayPal buttons returned when transaction is approved.
 * Required to create payment record and to authorize the payment
 * @type {object}
 * @property {number} data from paypal buttons onApprove callback
 * @property {number} actions from paypal buttons onApprove callback
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

  const getClassRegistrations = async () => {
    const url = `${Constants.baseUrl}/api/class_registrations`

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
   *
   * @param {ClassRegistrationPayload} classRegistration
   * @returns {Promise<ClassRegistration>}
   */
  const createClassRegistration = async (classRegistration) => {
    const url = `${Constants.baseUrl}/api/class_registrations`

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(classRegistration)
    }

    return await fetchAndCheckStatus(url, undefined, postOptions)
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

    const putOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(updatedClassObj)
    };

    return await fetchAndCheckStatus(url, undefined, putOptions)
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

    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      }
    }

    return await fetchAndCheckStatus(url, undefined, deleteOptions)
  }

  return {
    // GET
    getClasses,
    getClass,
    getClassRegistrations,
    // POST
    createClass,
    createClassRegistration,
    // PUT
    updateClass,
    // DELETE
    deleteClass
  }
}

export default classesApiService
