const defaultClassMtgs = [
  {
    name: 'Classroom training',
    boatId: null,
    details: 'this is the first classroom training',
    start: null,
    end: null
  },
  {
    name: 'Classroom training',
    boatId: null,
    details: 'this is the second classroom training',
    start: null,
    end: null
  },
  {
    name: 'On-the-water training',
    boatId: -1,
    details: 'this is the first on the water training',
    start: null,
    end: null
  },
  {
    name: 'On-the-water training',
    boatId: -1,
    details: 'this is the second on the water training',
    start: null,
    end: null
  },
  {
    name: 'On-the-water training (check sail)',
    boatId: -1,
    details: 'this is the check sail',
    start: null,
    end: null
  }
]

const freshMtg = {
  name: 'New Mtg',
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
