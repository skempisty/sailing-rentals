export default class Rental {
  constructor({
    id,
    start,
    end,
    rentedBy,
    boatId,
    crewCount,
    createdAt,
    deletedAt
  }) {
    this.id = id
    this.start = start
    this.end = end
    this.rentedBy = rentedBy
    this.boatId = boatId
    this.crewCount = crewCount
    this.createdAt = createdAt || ''
    this.deletedAt = deletedAt
  }
}