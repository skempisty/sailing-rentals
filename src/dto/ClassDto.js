const ClassMeetingDto = require('./ClassMeetingDto')

class ClassDto {
  constructor({
    id,
    capacity,
    price,
    meetings
  }) {
    const hasRequiredFields = [ capacity, price, meetings ].every(Boolean)
    if (!hasRequiredFields) throw new Error('Error creating a ClassDto without a required field')

    this.id = id || null
    this.capacity = capacity
    this.price = price
    this.meetings = meetings.map(mtg => new ClassMeetingDto(mtg))
  }
}

module.exports = ClassDto
