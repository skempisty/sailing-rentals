import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

const settingsApiService = () => {
  /**
   * ░██████╗░███████╗████████╗
   * ██╔════╝░██╔════╝╚══██╔══╝
   * ██║░░██╗░█████╗░░░░░██║░░░
   * ██║░░╚██╗██╔══╝░░░░░██║░░░
   * ╚██████╔╝███████╗░░░██║░░░
   * ░╚═════╝░╚══════╝░░░╚═╝░░░
   */

  const getClassInfo = async () => {
    const url = `${Constants.baseUrl}/api/settings/class_info`

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
   * ██████╗░██╗░░░██╗████████╗
   * ██╔══██╗██║░░░██║╚══██╔══╝
   * ██████╔╝██║░░░██║░░░██║░░░
   * ██╔═══╝░██║░░░██║░░░██║░░░
   * ██║░░░░░╚██████╔╝░░░██║░░░
   * ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░
   */

  const updateSettings = async (updateFields) => {
    const url = `${Constants.baseUrl}/api/settings`

    const putOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(updateFields)
    }

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
    // GET
    getClassInfo,
    // POST
    /* eslint-disable-next-line multiline-comment-style */
    // PUT
    updateSettings
    // DELETE
  }
}

export default settingsApiService
