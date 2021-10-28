import { createAsyncThunk } from '@reduxjs/toolkit'

import getBoatByRentalId from '../orm/boats/getBoatByRentalId'

const getClassesThunk = createAsyncThunk(
  'classes/getClass',
  async (id, { extra }) => {
    const { classesApiService } = extra

    const classDto = await classesApiService.getClass(id)

    /*
     * Class meetings comes in without an associated boatId
     * but they do have rentalId if it is a useBoat meeting
     */
    classDto.meetings = classDto.meetings.map(mtg => ({
      boatId: mtg.rentalId ? getBoatByRentalId(mtg.rentalId).id : null,
      ...mtg
    }))

    return classDto
  }
)

export default getClassesThunk
