const db = require('../connectDb')

const ClassMeeting = require('../domains/ClassMeeting')

const RentalsDao = require('../dao/RentalsDao')
const ClassesDao = require('../dao/ClassesDao')
const ClassMeetingsDao = require('../dao/ClassMeetingsDao')

const ClassDto = require('../dto/ClassDto')

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

  await ClassMeeting.createMeetingsWithAndWithoutRentals(classDto.meetings, createdClass.id, creatorId)

  return createdClass
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

  const currentClassMtgIds = currentClassMeetings.map(currentClassMtg => currentClassMtg.id)
  const updatedClassMtgIds = updatedClassDto.meetings.map(currentClassMtg => currentClassMtg.id)

  const meetingsToAdd = updatedClassDto.meetings.filter(updatedClassMtg => {
    return !currentClassMtgIds.includes(updatedClassMtg.id)
  })

  const meetingsToDelete = currentClassMeetings.filter(currentClassMtg => {
    return !updatedClassMtgIds.includes(currentClassMtg.id)
  })

  // a class update may include meetings that weren't already in the class
  if (meetingsToAdd.length) {
    await ClassMeeting.createMeetingsWithAndWithoutRentals(meetingsToAdd, updatedClassDto, updaterId)
  }

  // a class update may not include meetings already in the class
  if (meetingsToDelete.length) {
    await ClassMeeting.deleteMeetingsAndTheirRentals(meetingsToDelete)
  }

  // update associated rentals to match updated class meeting start-end times/boat/crewCount/etc
  const meetingsWithRentals = updatedClassDto.meetings.filter(mtg => mtg.rentalId)

  for (const mtg of meetingsWithRentals) {
    await RentalsDao.updateClassMeetingRental(mtg.rentalId, mtg, updatedClassDto)
  }

  // update all class meetings
  for (const mtg of updatedClassDto.meetings) {
    await ClassMeetingsDao.update(mtg.id, mtg)
  }

  // update class
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