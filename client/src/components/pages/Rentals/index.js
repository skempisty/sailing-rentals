import React from 'react';
import { connect } from "react-redux";
import ContentWrapper from "../../ContentWrapper";

import { Card, Table, Badge, Button, Container, Row, Col } from 'react-bootstrap';

class Rentals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddRentalModal: false
    }
  }

  render() {
    const { myRentals } = this.props;

    return (
      <ContentWrapper>
        <h1 style={{ color: 'white' }}>Rentals</h1>

        <Button
          onClick={() => this.setState({ showAddRentalModal: true })}
          style={{ marginBottom: '1em' }}
        >
          Rent
        </Button>

        <Card>
          {myRentals ?
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>Boat</th>
                <th>Rental Period</th>
                <th>Paid</th>
                <th>Rented At</th>

              </tr>
              </thead>

              <tbody>
              <tr>
                <td>Cloud Nine</td>
                <td>Mark</td>
                <td>3.50</td>
                <td>noonthirty</td>
              </tr>

              <tr>
                <td>Cloud Nine</td>
                <td>Jacob</td>
                <td>3.50</td>
                <td>noon</td>
              </tr>
              </tbody>
            </Table>
            :
            <div>No Rentals Found. Purchase a rental and you'll find it here!</div>
          }
        </Card>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { myRentals } = state.general;

  return { myRentals };
};

export default connect(
  mapStateToProps,
  null
)(Rentals);