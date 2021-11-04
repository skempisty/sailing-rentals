const RentalsDao = require('../dao/RentalsDao')
const ClassMeetingsDao = require('../dao/ClassMeetingsDao')

const ClassMeetingDto = require('../dto/ClassMeetingDto')
const RentalDto = require('../dto/RentalDto')

const { rentalTypes } = require('../utils/constants')

/**
 * @param meetings
 * @param classDto
 * @param creatorId
 * @returns {Promise<void>}
 */
const createMeetingsWithAndWithoutRentals = async (meetings, classDto, creatorId) => {
  // create the boat rentals for the "useBoat" meetings
  const useBoatMtgs = meetings.filter(mtg => mtg.boatId)
  const noBoatMtgs = meetings.filter(mtg => !mtg.boatId)

  let newBoatMeetings = []

  if (useBoatMtgs.length) {
    const meetingRentals = useBoatMtgs.map(mtg => new RentalDto({
      type: rentalTypes.KLASS,
      boatId: mtg.boatId,
      rentedBy: creatorId,
      crewCount: classDto.capacity,
      start: mtg.start,
      end: mtg.end,
      reason: 'Sailing Instruction'
    }))

    const newRentalIds = await RentalsDao.createMany(meetingRentals)

    // create useBoat meetings using inserted Rental ids
    newBoatMeetings = useBoatMtgs.map((mtg, index) => {
      const { name, instructorId, details, start, end } = mtg

      return new ClassMeetingDto({
        name,
        classId: classDto.id,
        instructorId,
        rentalId: newRentalIds[index],
        details,
        start,
        end
      })
    })
  }

  // create the non-boat using meetings
  const newNoBoatMeetings = noBoatMtgs.map(mtg => {
    const { name, instructorId, details, start, end } = mtg

    return new ClassMeetingDto({
      name,
      classId: classDto.id,
      instructorId,
      rentalId: null,
      details,
      start,
      end
    })
  })

  const combinedMtgs = newBoatMeetings.concat(newNoBoatMeetings)

  await ClassMeetingsDao.createMany(combinedMtgs)
}

/**
 * @param {ClassMeetingDto[]} meetingsToDelete
 * @returns {Promise<void>}
 */
const deleteMeetingsAndTheirRentals = async (meetingsToDelete) => {
  const deleteMtgIds = meetingsToDelete.map(mtg => mtg.id)

  // delete any class_meetings associated with the class
  await ClassMeetingsDao.markManyDeletedByIds(deleteMtgIds)

  const associatedRentalIds = meetingsToDelete.map(mtg => mtg.rentalId).filter(Boolean)

  if (associatedRentalIds.length) {
    // delete any rentals associated with any of the deleted class_meetings
    await RentalsDao.markManyDeletedByIds(associatedRentalIds)
  }

  // TODO: delete any class_registrations associated with this class
}

module.exports = {
  createMeetingsWithAndWithoutRentals,
  deleteMeetingsAndTheirRentals
}
