import { v4 as uuidv4 } from 'uuid'

import Klass from '../../models/Klass'

const randomClassId = uuidv4()

const defaultClassMtgs = [
  {
    id: uuidv4(),
    name: 'Classroom training 1',
    classId: randomClassId,
    instructorId: -1,
    boatId: null,
    details: '',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 1',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: '',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 2',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: '',
    start: null,
    end: null
  },
  {
    id: uuidv4(),
    name: 'On-the-water training 3',
    classId: randomClassId,
    instructorId: -1,
    boatId: -1,
    details: '',
    start: null,
    end: null
  }
]

const defaultClass = new Klass({
  capacity: 5,
  price: 225,
  meetings: defaultClassMtgs
})

/**
 * -1 classId indicates we're crafting a new Class.
 * @param {number|string} classId
 * @returns {boolean}
 */
const isNewClass = (classId) => Number(classId) < 0

const getFreshClassMtg = (classId = null) => {
  return {
    id: uuidv4(),
    name: 'New Mtg',
    classId: classId || randomClassId,
    instructorId: -1,
    boatId: null,
    details: '',
    start: null,
    end: null
  }
}

export default {
  defaultClass,
  defaultClassMtgs,
  isNewClass,
  getFreshClassMtg
}
