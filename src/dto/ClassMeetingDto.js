class ClassMeetingDto {
  constructor({
    id,
    classId,
    instructorId,
    rentalId,
    boatId,
    name,
    details,
    start,
    end
  }) {
    const hasRequiredFields = [ classId, instructorId, start, end ].every(Boolean)
    if (!hasRequiredFields) throw new Error('Error creating a ClassMeetingDto without a required field')

    this.id = id || null
    this.classId = classId
    this.instructorId = instructorId
    this.rentalId = rentalId || null
    this.boatId = boatId || null
    this.name = name || ''
    this.details = details || ''
    this.start = start
    this.end = end
  }
}

module.exports = ClassMeetingDto
