import store from '../../index'

export default function getRentalById(id){
  if (!id) return {}

  const state = store.getState()

  const { allRentals } = state.rentals

  return allRentals.find(rental => rental.id === id)
}
