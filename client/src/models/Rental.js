export default class Rental {
  constructor({
    start,
    end,
    rentedBy,
    boatId,
    crewCount,
    createdAt
  }) {
    this.start = start;
    this.end = end;
    this.rentedBy = rentedBy;
    this.boatId = boatId;
    this.crewCount = crewCount;
    this.createdAt = createdAt || '';
  }
}