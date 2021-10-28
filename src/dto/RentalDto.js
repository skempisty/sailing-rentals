class Rental {
  constructor({
    id,
    type,
    boatId,
    rentedBy,
    crewCount,
    start,
    end,
    reason
  }) {
    const hasRequiredFields = [ type, boatId, rentedBy, crewCount, start, end ].every(Boolean)
    if (!hasRequiredFields) throw new Error('Error creating a Rental object without a required field')

    this.id = id || null
    this.type = type
    this.boatId = boatId
    this.rentedBy = rentedBy
    this.crewCount = crewCount
    this.start = start
    this.end = end
    this.reason = reason || ''
  }
}

module.exports = Rental