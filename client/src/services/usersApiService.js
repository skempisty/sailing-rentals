import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

/**
 * @typedef User
 * @type {object}
 */

const usersApiService = () => {
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
  const getUsers = async () => {
    const url = `${Constants.baseUrl}/api/users`;

    const expectedStatuses = [ 200 ]

    const getOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      }
    };

    return await fetchAndCheckStatus(url, expectedStatuses, getOptions)
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
   * ██████╗░██╗░░░██╗████████╗
   * ██╔══██╗██║░░░██║╚══██╔══╝
   * ██████╔╝██║░░░██║░░░██║░░░
   * ██╔═══╝░██║░░░██║░░░██║░░░
   * ██║░░░░░╚██████╔╝░░░██║░░░
   * ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░
   */

  /**
   * @param {number} id the user id we want to update
   * @param {User} updatedUserObj
   * @returns {Promise<User>}
   */
  const updateUser = async (id, updatedUserObj) => {
    const url = `${Constants.baseUrl}/api/users/${id}`

    const expectedStatuses = [ 200 ]

    const putOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(updatedUserObj)
    }

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

  const deleteUser = async (id) => {
    const url = `${Constants.baseUrl}/api/users/${id}`

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
    getUsers,
    // POST
    /* eslint-disable-next-line multiline-comment-style */
    // PUT
    updateUser,
    // DELETE
    deleteUser
  }
}

export default usersApiService
