import moment from 'moment'

/**
 * @deprecated use Event domain's splitUpcomingAndPast method instead
 * Split a group of rentals into upcoming and past rentals for display on UI
 * @param {Rental[]} rentals array
 * @return {{pastRentals: Rental[], upcomingRentals: Rental[]}}
 */
export default function splitUpcomingAndPastRentals(rentals) {
  const upcomingRentals = []
  const pastRentals = []

  rentals.forEach((rental) => {
    if (moment(rental.end).isAfter()) {
      upcomingRentals.push(rental)
    } else {
      pastRentals.push(rental)
    }
  })

  return { upcomingRentals, pastRentals }
}
