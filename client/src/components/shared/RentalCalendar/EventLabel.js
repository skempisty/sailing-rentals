import React from 'react'
import PropTypes from 'prop-types'

const EventLabel = ({
  view,
  rental,
  label,
  details,
  svgComponent,
  onMonthViewEventClick
}) => {
  const handleEventClick = () => {
    if (view === 'month') {
      onMonthViewEventClick(rental)
    }
  }

  const isMonthView = view === 'month'
  const isDayView = view === 'day'

  return (
    <div onClick={handleEventClick}>
      <div
        style={{
          display: 'flex',
          justifyContent: isMonthView ? 'center' : null,
          alignItems: 'center',
          height: isMonthView ? '24px' : null
        }}
      >
        {svgComponent &&
        <span
          style={{
            display: isMonthView ? 'flex' : null,
            justifyContent: isMonthView ? 'center' : null,
            alignItems: isMonthView ? 'center' : null
          }}
        >
            {svgComponent}
          </span>
        }

        {label &&
          <b style={{ marginLeft: '0.5em' }}>{label}</b>
        }
      </div>

      {details && isDayView &&
        <div style={{ marginTop: '0.5em' }}>{details}</div>
      }
    </div>
  )
}

EventLabel.propTypes = {
  label: PropTypes.string,
  rental: PropTypes.object.isRequired,
  svgComponent: PropTypes.node,
  view: PropTypes.string.isRequired,
  onMonthViewEventClick: PropTypes.func.isRequired
}

export default EventLabel
