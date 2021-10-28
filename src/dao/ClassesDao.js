const db = require("../connectDb");

class Klass {
  constructor({
    id,
    details,
    capacity,
    price
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

  /**
   *
   * @param {Klass} classObj
   */
  create(classObj) {
    const { details, capacity, price, meetings } = classObj

    // create the class
    const newClass = [ details, capacity, price ]

    await db.query(`INSERT INTO ${db.name}.classes (details, capacity, price) VALUES (?, ?, ?)`, newClass)

    const [ createdClass ] = await db.query(`SELECT * FROM ${db.name}.classes WHERE id = LAST_INSERT_ID()`)
  }

  static update() {

  }
}

module.exports = Klass