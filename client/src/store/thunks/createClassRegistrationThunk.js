import { createAsyncThunk } from '@reduxjs/toolkit'

const createClassRegistrationThunk = createAsyncThunk(
  'classes/createClassRegistrationThunk',
  /**
   *
   * @param {ClassRegistrationPayload} classRegistrationPayload
   * @param extra has classesApiService
   * @returns {Promise<{ClassRegistration}>}
   */
  async (classRegistrationPayload, { extra}) => {
    const { classesApiService } = extra

    return await classesApiService.createClassRegistration(classRegistrationPayload)
  }
)

export default createClassRegistrationThunk