class ClassDto {
  constructor({
    id,
    details,
    capacity,
    price
  }) {
    const hasRequiredFields = [ capacity, price ].every(Boolean)
    if (!hasRequiredFields) throw new Error('Error creating a ClassDto without a required field')

    this.id = id || null
    this.details = details
    this.capacity = capacity
    this.price = price
  }
}

module.exports = ClassDto
