import React from 'react'
import { connect } from 'react-redux'
import { Card, Table } from 'react-bootstrap'

import PaymentRow from '../../../shared/table-rows/PaymentRow'

class PaymentsTab extends React.Component {
  render() {
    const { allPayments } = this.props

    return (
      <React.Fragment>
        <h3 style={{ color: 'white' }}>All Payments</h3>

        <Card>
          <Table responsive>
            <thead><tr>
              <th>Sailor</th>
              <th>Rental</th>
              <th>Amount</th>
              <th>Paid On</th>
              <th/>
            </tr></thead>

            <tbody>
              {allPayments.map((payment, index) =>
                <PaymentRow
                  key={`rental-row-${payment.id}-${index}`}
                  payment={payment}
                />
              )}
            </tbody>
          </Table>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { allPayments } = state.payments

  return { allPayments }
}

export default connect(
  mapStateToProps,
  null
)(PaymentsTab)
