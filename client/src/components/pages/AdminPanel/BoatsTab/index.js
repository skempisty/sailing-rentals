import React from 'react'
import { connect } from 'react-redux'

import { Card, Button, Table } from 'react-bootstrap'

import AddBoatModal from './AddBoatModal'

import BoatRow from "./BoatRow";

class BoatsTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showAddBoatModal: false }
  }

  render() {
    const { boats } = this.props;
    const { showAddBoatModal } = this.state;

    return (
      <React.Fragment>
        <AddBoatModal
          show={showAddBoatModal}
          onHide={() => this.setState({ showAddBoatModal: false })}
        />

        <Button
          onClick={() => this.setState({ showAddBoatModal: true })}
          style={{ marginBottom: '1em' }}
        >
          Add Boat
        </Button>

        <Card style={{ maxWidth: '40em' }}>
          <Table>
            <thead><tr>
              <th>Boat Name</th>
              <th>Model</th>
              <th>$Price/Hour</th>
              <th/>
            </tr></thead>

            <tbody>
              {boats.map((boat, index) =>
                <BoatRow
                  key={`boat-row-${boat.id}-${index}`}
                  boat={boat}
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
  const { boats } = state.boats;

  return { boats }
}

export default connect(
  mapStateToProps,
  null
)(BoatsTab)
