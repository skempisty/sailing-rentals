const _ = require('lodash')

const db = require('../connectDb')

const ClassMeeting = require('../domains/ClassMeeting')

const RentalsDao = require('../dao/RentalsDao')
const ClassesDao = require('../dao/ClassesDao')
const ClassMeetingsDao = require('../dao/ClassMeetingsDao')
const ClassRegistrationsDao = require('../dao/ClassRegistrationsDao')
const PaymentsDao = require('../dao/PaymentsDao')

const ClassDto = require('../dto/ClassDto')
const RentalDto = require('../dto/RentalDto')

const { rentalTypes } = require('../utils/constants')

/**
 * ░██████╗░███████╗████████╗
 * ██╔════╝░██╔════╝╚══██╔══╝
 * ██║░░██╗░█████╗░░░░░██║░░░
 * ██║░░╚██╗██╔══╝░░░░░██║░░░
 * ╚██████╔╝███████╗░░░██║░░░
 * ░╚═════╝░╚══════╝░░░╚═╝░░░
 */

exports.getClasses = async () => {
  const classes = await db.query(`SELECT * FROM ${db.name}.classes`)
  const classMeetings = await db.query(`SELECT * FROM ${db.name}.class_meetings`)

  return classes.map(klass => {
    const mtgsInClass = classMeetings.filter(mtg => mtg.classId === klass.id)

    return {
      ...klass,
      meetings: mtgsInClass
    }
  })
}

exports.getClass = async (id) => {
  const klass = await ClassesDao.getById(id)
  klass.meetings = await ClassMeetingsDao.getByClassId(id)

  return klass
}

exports.getClassRegistrations = async () => {
  return await ClassRegistrationsDao.getAll()
}

/**
 * ██████╗░░█████╗░░██████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
 * ██████╔╝██║░░██║╚█████╗░░░░██║░░░
 * ██╔═══╝░██║░░██║░╚═══██╗░░░██║░░░
 * ██║░░░░░╚█████╔╝██████╔╝░░░██║░░░
 * ╚═╝░░░░░░╚════╝░╚═════╝░░░░╚═╝░░░
 */

exports.createClass = async (classObj, creatorId) => {
  const classDto = new ClassDto(classObj)

  const createdClass = await ClassesDao.create(classDto)

  await ClassMeeting.createMeetingsWithAndWithoutRentals(classDto.meetings, createdClass, creatorId)

  return createdClass
}

exports.createFreeClassRegistration = async (classRegistrationDto) => {
  return await ClassRegistrationsDao.create(classRegistrationDto)
}

exports.createPaidClassRegistration = async (classRegistrationDto) => {
  const newRegistration = await ClassRegistrationsDao.create(classRegistrationDto)

  classRegistrationDto.id = newRegistration.id

  await PaymentsDao.createClassPayment(classRegistrationDto)

  return newRegistration
}

/**
 * ██████╗░██╗░░░██╗████████╗
 * ██╔══██╗██║░░░██║╚══██╔══╝
 * ██████╔╝██║░░░██║░░░██║░░░
 * ██╔═══╝░██║░░░██║░░░██║░░░
 * ██║░░░░░╚██████╔╝░░░██║░░░
 * ╚═╝░░░░░░╚═════╝░░░░╚═╝░░░
 */

exports.updateClass = async (id, updatedClassObj, updaterId) => {
  const updatedClassDto = new ClassDto(updatedClassObj)

  // get class meetings before updating
  const currentClassMeetings = await ClassMeetingsDao.getByClassId(id)

  /**
   * Create extra meetings and any meeting rentals that aren't already saved in db
   */
  const meetingsToAdd = _.differenceBy(updatedClassDto.meetings, currentClassMeetings, 'id')

  // a class update may include meetings that weren't already in the class
  if (meetingsToAdd.length) {
    await ClassMeeting.createMeetingsWithAndWithoutRentals(meetingsToAdd, updatedClassDto, updaterId)
  }

  /**
   * Delete meetings and associated rentals that are missing from the request but are in the db
   */
  const meetingsToDelete = _.differenceBy(currentClassMeetings, updatedClassDto.meetings, 'id')

  // a class update may not include meetings already in the class
  if (meetingsToDelete.length) {
    await ClassMeeting.deleteMeetingsAndTheirRentals(meetingsToDelete)
  }

  /**
   * Update meetings that were saved in the db and are also in the request
   */
  const meetingsToUpdate = _.intersectionBy(updatedClassDto.meetings, currentClassMeetings, 'id')

  for (const mtg of meetingsToUpdate) {
    const matchingCurrentMtg = currentClassMeetings.find(currentMtg => currentMtg.id === mtg.id)

    const isYesBoatToNoBoat = !!matchingCurrentMtg.rentalId && !mtg.boatId
    const isNoBoatToYesBoat = !matchingCurrentMtg.rentalId && !!mtg.boatId
    const isYesBoatToYesBoat = !!matchingCurrentMtg.rentalId && !!mtg.boatId

    if (isYesBoatToNoBoat) {
      /**
       * Yes boat -> No boat
       * Update class meeting and delete the rental associated with it
       */
      await RentalsDao.markManyDeletedByIds([mtg.rentalId])

      const mtgNullRentalId = {
        ...mtg,
        rentalId: null
      }

      await ClassMeetingsDao.update(mtg.id, mtgNullRentalId)
    } else if (isNoBoatToYesBoat) {
      /**
       * No boat -> Yes boat
       * Update class meeting and create a rental attached to it
       */
      const newRental = new RentalDto({
        type: rentalTypes.KLASS,
        boatId: mtg.boatId,
        rentedBy: updaterId,
        crewCount: updatedClassDto.capacity,
        start: mtg.start,
        end: mtg.end
      })

      const newRentalId = await RentalsDao.create(newRental, newRental.rentedBy)

      await ClassMeetingsDao.update(mtg.id, { ...mtg, rentalId: newRentalId })
    } else if (isYesBoatToYesBoat) {
      /**
       * Yes boat -> Yes boat
       * Update the class meeting and the attached rental
       */
      await RentalsDao.updateClassMeetingRental(mtg.rentalId, mtg, updatedClassDto)

      await ClassMeetingsDao.update(mtg.id, mtg)
    } else {
      /**
       * No boat -> No boat
       * Just update the class meeting
       */
      await ClassMeetingsDao.update(mtg.id, mtg)
    }
  }

  /**
   * Update the actual class record
   */
  await ClassesDao.update(id, updatedClassDto)
}

/**
 * ██████╗░███████╗██╗░░░░░███████╗████████╗███████╗
 * ██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝
 * ██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░
 * ██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░
 * ██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗
 * ╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝
 */

exports.deleteClass = async (id) => {
  const meetingsToDelete = await ClassMeetingsDao.getByClassId(id)

  // // delete any class_meetings associated with the class
  await ClassMeeting.deleteMeetingsAndTheirRentals(meetingsToDelete)

  // delete the class itself
  await ClassesDao.markDeleted(id)
}