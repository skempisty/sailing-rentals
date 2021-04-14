import React from 'react';
import PropTypes from 'prop-types'

export default class EventLabel extends React.Component {
  handleEventClick() {
    const { rental, view, onMonthViewEventClick } = this.props

    if (view === 'month') {
      onMonthViewEventClick(rental)
    }
  }

  get isMonthView() {
    const { view } = this.props

    return view === 'month'
  }

  render() {
    const { label, svgComponent } = this.props

    return (
      <div
        onClick={this.handleEventClick.bind(this)}
        style={{
          display: 'flex',
          justifyContent: this.isMonthView ? 'center' : null,
          alignItems: 'center',
          height: this.isMonthView ? '24px' : null
        }}
      >
        {svgComponent &&
          <span
            style={{
              display: this.isMonthView ? 'flex' : null,
              justifyContent: this.isMonthView ? 'center' : null,
              alignItems: this.isMonthView ? 'center' : null
            }}
          >
            {svgComponent}
          </span>
        }

        {label &&
          <b style={{ marginLeft: '0.5em' }}>{label}</b>
        }
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
