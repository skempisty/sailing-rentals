import React from 'react';
import { connect } from 'react-redux';

import { Card, Button, Modal } from 'react-bootstrap';

class BoatsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAddBoatModal: false };
  }

  hideAddBoatModal() {
    this.setState({ showAddBoatModal: false });
  }

  render() {
    const { boats } = this.props;
    const { showAddBoatModal } = this.state;

    return (
      <React.Fragment>
        <Modal show={showAddBoatModal} onHide={this.hideAddBoatModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideAddBoatModal.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.hideAddBoatModal.bind(this)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          onClick={() => this.setState({ showAddBoatModal: true })}
          style={{ marginBottom: '1em' }}
        >
          Add Boat
        </Button>

        <Card>
          <Card.Body>
            {boats.map(boat =>
              <div>{boat.name}</div>
            )}
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { boats } = state.general;

  return { boats };
};

export default connect(
  mapStateToProps,
  null
)(BoatsTab);
