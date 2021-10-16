import { v4 as uuidv4 } from 'uuid'

const randomClassId = uuidv4()

const defaultClassMtgs = [
  {
    id: uuidv4(),
    name: 'Classroom training 1',
    classId: randomClassId,
    instructorId: -1,
    boatId: null,
    details: 'this is the first classroom training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'Classroom training 2',
    classId: randomClassId,
    instructorId: -1,
    boatId: null,
    details: 'this is the second classroom training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 1',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: 'this is the first on the water training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 2',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: 'this is the second on the water training',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'Check Sail',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: 'this is the check sail',
    start: null,
    end: null
  }
]

const freshMtg = {
  id: uuidv4(),
  name: 'New Mtg',
  classId: randomClassId,
  instructorId: -1,
  boatId: null,
  details: 'Something should be taught here',
  start: null,
  end: null
}

/**
 * -1 classId indicates we're crafting a new Class.
 * @param {number|string} classId
 * @returns {boolean}
 */
const isNewClass = (classId) => Number(classId) < 0

export default {
  defaultClassMtgs,
  freshMtg,
  isNewClass
}
