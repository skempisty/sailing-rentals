import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Button, Form, Modal, Dropdown } from 'react-bootstrap';

const localizer = momentLocalizer(moment)

const StyledCalendar = styled.div`
  .rbc-time-slot { min-height: 3em; }
`;

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
        date: new Date(clickMoment.year(), clickMoment.month(), clickMoment.date())
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
    const { newRentalEvent } = this.state;

    return [
      newRentalEvent,
      ...existingEvents
    ];
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

    return this.selectedThreeHourSlot(event) ?
      <b>Sailing on the {this.getBoatNameById(selectedBoatId)}</b>
      :
      <b>Please select a 3 hour time slot</b>;
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Cancel
          </Button>

          <Button variant='primary' onClick={onRentalAdd}>
            Create Rental
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