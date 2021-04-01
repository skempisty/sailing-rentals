import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components'

import { FaExclamationTriangle } from 'react-icons/fa';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Button, Form, Modal, Dropdown, Col } from 'react-bootstrap';
import Rental from "../../../models/Rental";

const localizer = momentLocalizer(moment)

const StyledCalendar = styled.div`
  .rbc-time-slot { min-height: 3em; }
`;

class AddRentalModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBoatId: '',
      crewCount: 0,
      view: 'month',
      date: new Date(),
      newRentalPeriod: {}
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
      // drill down to clicked day on calendar
      this.setState({
        view: 'day',
        date: new Date(clickMoment.year(), clickMoment.month(), clickMoment.date())
      })
    } else if (isDayRangeSelect) {
      const newRentalPeriod = {
        start,
        end
      }

      this.setState({ newRentalPeriod })
    }
  }

  handleProceedClick() {
    const { currentUser, onRentalAdd } = this.props;
    const { newRentalPeriod, crewCount, selectedBoatId } = this.state;

    const newRental = new Rental({
      start: newRentalPeriod.start,
      end: newRentalPeriod.end,
      rentedBy: currentUser.id,
      boatId: selectedBoatId,
      crewCount
    });

    console.log('formData', newRental)

    onRentalAdd(newRental)
  }

  get minTime() {
    const minTime = new Date();
    minTime.setHours(7,0,0);

    return minTime;
  }

  get maxTime() {
    const maxTime = new Date();
    maxTime.setHours(20,0,0);

    return maxTime;
  }

  /**
   * Only way to determine if a time slot is 3 hours. Don't use the slots
   * property, it is inaccurate
   */
  selectedThreeHourSlot(event) {
    const { start, end } = event

    const duration = moment.duration(moment(end).diff(moment(start)))

    /*
     * Sometimes duration.asHours() gives a result like 2.9999, probably as a
     * result of a bug with react-big-calendar. This rounds to the nearest 100th
     * to adjust for this issue
     */
    const hours = Math.round((duration.asHours() + Number.EPSILON) * 100) / 100

    return hours === 3;
  }

  get events() {
    const { existingEvents } = this.props;
    const { newRentalPeriod } = this.state;

    return [
      newRentalPeriod,
      ...existingEvents
    ];
  }

  get validRental() {
    const MINIMUM_CREW_COUNT = 1

    const {
      selectedBoatId,
      newRentalPeriod,
      crewCount
    } = this.state;

    return (
      this.selectedThreeHourSlot(newRentalPeriod) &&
      !!selectedBoatId &&
      crewCount >= MINIMUM_CREW_COUNT
    )
  }

  eventStyleGetter(event) {
    const backgroundColor = this.selectedThreeHourSlot(event) ? 'green' : 'red';

    const style = {
      backgroundColor: backgroundColor
    };

    return { style };
  }

  titleAccessor(event) {
    const { selectedBoatId } = this.state;

    const boatName = this.getBoatNameById(selectedBoatId);

    if (!this.selectedThreeHourSlot(event)) {
      return <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <FaExclamationTriangle/>
        <b style={{ marginLeft: '0.5em' }}>Please select a 3 hour time slot</b>
      </div>
    } else if (!boatName) {
      return <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <FaExclamationTriangle/>
        <b style={{ marginLeft: '0.5em' }}>Select a boat</b>
      </div>
    } else {
      return <b>Sailing on the {boatName}</b>
    }
  }

  render() {
    const { show, onHide, boats } = this.props;
    const { selectedBoatId, crewCount, view, date } = this.state;

    return (
      <Modal show={show} onHide={onHide} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Rental</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                {/* Boat Select */}
                <Form.Label><b>Boat</b></Form.Label>
                <Dropdown>
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
              </Form.Group>

              <Form.Group as={Col}>
                {/* Crew Members Select */}
                <Form.Label><b>Crew Members</b></Form.Label>
                <Form.Control
                  type='number'
                  value={crewCount}
                  onChange={(e) => this.setState({ crewCount: e.target.value })}
                />
              </Form.Group>
            </Form.Row>
          </Form>

          <StyledCalendar>
            <Calendar
              localizer={localizer}
              style={{ height: '30em', marginTop: '1em' }}
              views={['month', 'day']}
              timeslots={1}
              selectable
              view={view}
              date={date}
              events={this.events}
              min={this.minTime} // set earliest time visible on calendar
              max={this.maxTime} // set latest time visible on calendar
              eventPropGetter={(e) => this.eventStyleGetter(e)}
              titleAccessor={(e) => this.titleAccessor(e)}
              onView={(view) => this.setState({ view })} // fires when one of the view buttons is pressed
              onNavigate={(date) => this.setState({ date })}
              onSelectSlot={this.handleSelectSlot.bind(this)}
            />
          </StyledCalendar>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Cancel
          </Button>

          <Button
            variant='primary'
            disabled={!this.validRental}
            onClick={this.handleProceedClick.bind(this)}
          >
            Create Rental
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser, boats } = state.general;

  return { currentUser, boats };
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