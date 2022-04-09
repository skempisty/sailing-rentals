import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

const boatsApiService = () => {
  /**
   * ░██████╗░███████╗████████╗
   * ██╔════╝░██╔════╝╚══██╔══╝
   * ██║░░██╗░█████╗░░░░░██║░░░
   * ██║░░╚██╗██╔══╝░░░░░██║░░░
   * ╚██████╔╝███████╗░░░██║░░░
   * ░╚═════╝░╚══════╝░░░╚═╝░░░
   */

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

  const updateBoat = async (id, updatedBoatObj) => {
    const url = `${Constants.baseUrl}/api/boats/${id}`

    const putOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(updatedBoatObj)
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

  return {
    /* eslint-disable-next-line multiline-comment-style */
    // GET
    // POST
    // PUT
    updateBoat
    // DELETE
  }
}

export default boatsApiService
