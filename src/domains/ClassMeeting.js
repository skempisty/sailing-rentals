const RentalsDao = require('../dao/RentalsDao')

const ClassMeetingDto = require('../dto/ClassMeetingDto')
const RentalDto = require('../dto/RentalDto')

const {rentalTypes} = require('../utils/constants')
const ClassMeetingsDao = require("../dao/ClassMeetingsDao");

/**
 *
 * @param meetings
 * @returns {ClassMeetingDto[]}
 */
const createMeetingsWithRentals = async (meetings, classCapacity) => {
  // create the boat rentals for the "useBoat" meetings
  const useBoatMtgs = meetings.filter(mtg => mtg.boatId)
  const noBoatMtgs = meetings.filter(mtg => !mtg.boatId)

  let newBoatMeetings = []

  if (useBoatMtgs.length) {
    const meetingRentals = useBoatMtgs.map(mtg => new RentalDto({
      type: rentalTypes.KLASS,
      boatId: mtg.boatId,
      rentedBy: creatorId,
      crewCount: capacity,
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
        classId: createdClass.id,
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
      classId: createdClass.id,
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

module.exports = {
  createMeetingsWithRentals
}
