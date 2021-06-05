import React from 'react'
import { connect } from 'react-redux'

import { Card, Table, Alert } from 'react-bootstrap'

import RentalRow from '../../../shared/table-rows/RentalRow'

import splitUpcomingAndPastRentals from '../../../../utils/splitUpcomingAndPastRentals'
import isNotDeleted from '../../../../utils/isNotDeleted'

class RentalsTab extends React.Component {
  render() {
    const { allRentals } = this.props

    const { upcomingRentals, pastRentals } = splitUpcomingAndPastRentals(allRentals)

    const upcomingRentalsToShow = upcomingRentals.filter(isNotDeleted)
    const pastRentalsToShow = pastRentals.filter(isNotDeleted)

    return (
      <React.Fragment>
        <h3 style={{ color: 'white' }}>Upcoming</h3>

        <Card>
          <Table responsive style={{ margin: '0' }}>
            <thead><tr>
              <th>Sailor</th>
              <th>Start</th>
              <th>End</th>
              <th>Boat</th>
              <th>Crew</th>
              <th>Rented At</th>
              <th/>
            </tr></thead>

            {!!upcomingRentalsToShow.length &&
              <tbody>
                {upcomingRentalsToShow.map((rental, index) =>
                  <RentalRow
                    key={`rental-row-${rental.id}-${index}`}
                    rental={rental}
                    options
                    showSailor
                  />
                )}
              </tbody>
            }
          </Table>

          {!upcomingRentalsToShow.length &&
            <Alert
              variant='dark'
              style={{
                margin: '0.5em',
                textAlign: 'center'
              }}
            >
              <b>No Upcoming Rentals</b>
            </Alert>
          }
        </Card>

        <h3 style={{ color: 'white', marginTop: '0.5em' }}>Past</h3>

        <Card>
          <Table responsive style={{ margin: '0' }}>
            <thead>
              <tr>
                <th>Sailor</th>
                <th>Start</th>
                <th>End</th>
                <th>Boat</th>
                <th>Crew</th>
                <th>Rented At</th>
              </tr>
            </thead>

            {!!pastRentalsToShow.length &&
              <tbody>
                {pastRentalsToShow.map((rental, index) =>
                  <RentalRow
                    key={`rental-row-${rental.id}-${index}`}
                    rental={rental}
                    showSailor
                  />
                )}
              </tbody>
            }
          </Table>

          {!pastRentalsToShow.length &&
            <Alert
              variant='dark'
              style={{
                margin: '0.5em',
                textAlign: 'center'
              }}
            >
              <b>No Past Rentals</b>
            </Alert>
          }
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { allRentals } = state.rentals

  return { allRentals }
}

export default connect(
  mapStateToProps,
  null
)(RentalsTab)
