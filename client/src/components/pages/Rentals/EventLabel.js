import React from 'react';
import PropTypes from 'prop-types'

export default class EventLabel extends React.Component {
  handleEventClick() {
    const { rental, view, onMonthViewEventClick } = this.props

    if (view === 'month') {
      onMonthViewEventClick(rental)
    }
  }

  render() {
    const { label, svgComponent, view } = this.props

    return (
      <div
        onClick={this.handleEventClick.bind(this)}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {view !== 'month' &&
          <span>{svgComponent}</span>
        }

        <b style={{ marginLeft: '0.5em' }}>{label}</b>
      </div>
    )
  }
}

EventLabel.propTypes = {
  label: PropTypes.string,
  rental: PropTypes.object.isRequired,
  svgComponent: PropTypes.node,
  view: PropTypes.string.isRequired,
  onMonthViewEventClick: PropTypes.func.isRequired
}
