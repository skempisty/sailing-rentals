export default class Boat {
  constructor({
    id,
    name,
    model,
    perHourRentalCost,
    description,
    imageUrl,
    deletedAt
  }) {
    this.id = id
    this.name = name
    this.model = model
    this.perHourRentalCost = perHourRentalCost
    this.description = description
    this.imageUrl = imageUrl
    this.deletedAt = deletedAt
  }
}