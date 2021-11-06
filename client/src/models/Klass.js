export default class Klass {
  constructor({
    id,
    details,
    capacity,
    price,
    meetings,
    createdAt,
    updatedAt,
    deletedAt
  } = {}) {
    this.id = id || null
    this.details = details || ''
    this.capacity = capacity || 5
    this.price = price || 225.00
    this.meetings = meetings || []
    this.createdAt = createdAt || null
    this.updatedAt = updatedAt || null
    this.deletedAt = deletedAt || null
  }
}
