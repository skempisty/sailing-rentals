const defaultClassMtgs = [
  {
    name: 'Classroom training',
    details: 'this is the first classroom training'
  },
  {
    name: 'Classroom training',
    details: 'this is the second classroom training'
  },
  {
    name: 'On-the-water training',
    details: 'this is the first on the water training'
  },
  {
    name: 'On-the-water training',
    details: 'this is the second on the water training'
  },
  {
    name: 'On-the-water training (check sail)',
    details: 'this is the check sail'
  }
]

const freshMtg = {
  name: 'New Mtg',
  details: 'Something should be taught here'
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
