import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Button, Form, Modal, Dropdown } from 'react-bootstrap';

const localizer = momentLocalizer(moment)

class AddRentalModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBoatId: '',
      view: 'month',
      date: new Date(),
      newRentalEvent: {}
    }
  }

  getBoatNameById(id) {
    const { boats } = this.props;

    for (let i = 0; i < boats.length; i++) {
      if (boats[i].id === id) {
        return boats[i].name;
      }
    }

    return '';
  }

  handleSelectSlot(e) {
    const { start, end, slots } = e;

    const clickMoment = moment(slots[0]);

    const isSingleDateClick = slots.length === 1 && clickMoment.hour() === 0
    const isDayRangeSelect = moment(start).hour() !== 0

    if (isSingleDateClick) {
      this.setState({
        view: 'day',
        date: new Date(clickMoment.year(), clickMoment.month(), clickMoment.day())
      })
    } else if (isDayRangeSelect) {
      const newEvent = {
        title: 'New Rental', // TODO: make this something more specific
        start,
        end
      }

      this.setState({ newRentalEvent: newEvent })
    }
  }

  get minTime() {
    const minTime = new Date();
    minTime.setHours(8,30,0);

    return minTime;
  }

  get maxTime() {
    const maxTime = new Date();
    maxTime.setHours(19,30,0);

    return maxTime;
  }

  get events() {
    const { existingEvents } = this.props;
    const { newRentalEvent } = this.state;

    return [
      newRentalEvent,
      ...existingEvents
    ];
  }

  render() {
    const { show, onHide, onRentalAdd, boats } = this.props;
    const { selectedBoatId, view, date } = this.state;

    return (
      <Modal show={show} onHide={onHide} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Rental</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Boat Select */}
            <Form.Label><b>Boat</b></Form.Label>
            <Dropdown alignRight>
              <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                {this.getBoatNameById(selectedBoatId) || 'Select a boat'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {boats.map((boat, index) =>
                  <Dropdown.Item
                    key={`boat-select-${boat.id}-${index}`}
                    onSelect={() => this.setState({ selectedBoatId: boat.id })}
                  >
                    {boat.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Crew Members Select */}
            <Form.Label><b>Crew Members</b></Form.Label>
            <Form.Control value='5' readOnly/>

            <Calendar
              localizer={localizer}
              views={['month', 'day']}
              view={view}
              onView={(view) => this.setState({ view })} // fires when one of the view buttons is pressed
              date={date}
              onNavigate={(date) => this.setState({ date })}
              selectable
              events={this.events}
              style={{ height: "30em", marginTop: '1em' }}
              onSelectSlot={this.handleSelectSlot.bind(this)}
              min={this.minTime} // set earliest time visible on calendar
              max={this.maxTime} // set latest time visible on calendar
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Cancel
          </Button>

          <Button variant='primary' onClick={onRentalAdd}>
            Proceed to Payment
          </Button>
        </Modal.Footer>
      </Modal>
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
)(AddRentalModal);

AddRentalModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onRentalAdd: PropTypes.func
}

AddRentalModal.defaultProps = {
  existingEvents: []
}