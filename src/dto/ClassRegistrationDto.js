class ClassRegistrationDto {
  constructor({
    id,
    userId,
    classId,
    payPalData
  }) {
    const hasRequiredFields = [userId, classId].every(Boolean)
    if (!hasRequiredFields) throw new Error('Error creating a ClassRegistrationDto without a required field')

    this.id = id || null
    this.userId = userId
    this.classId = classId
    this.payPalData = payPalData || null
  }
}

module.exports = ClassRegistrationDto
