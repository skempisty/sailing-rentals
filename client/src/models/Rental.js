import { rentalTypes } from '../utils/constants'

export default class Rental {
  constructor({
    id,
    type,
    start,
    end,
    reason,
    rentedBy,
    boatId,
    crewCount,
    createdAt,
    deletedAt
  }) {
    this.id = id
    this.type = type || rentalTypes.STANDARD
    this.start = start
    this.end = end
    this.reason = reason || ''
    this.rentedBy = rentedBy
    this.boatId = boatId
    this.crewCount = crewCount
    this.createdAt = createdAt || ''
    this.deletedAt = deletedAt
  }
}