import store from '../../index'

export default function getBoatByRentalId(rentalId){
  if (!rentalId) return {}

  const state = store.getState()

  const { boats } = state.boats
  const { allRentals, myRentals } = state.rentals

  const searchableRentals = allRentals.length ? allRentals : myRentals

  const targetRental = searchableRentals.find(rental => rental.id === rentalId)

  return boats.find(boat => boat.id === targetRental.boatId)
}
