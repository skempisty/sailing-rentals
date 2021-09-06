import { createAsyncThunk } from '@reduxjs/toolkit'

const getUsersThunk = createAsyncThunk(
  'users/getUsers',
  async (_, { extra }) => {
    const { usersApiService } = extra

    return await usersApiService.getUsers()
  }
)

export default getUsersThunk