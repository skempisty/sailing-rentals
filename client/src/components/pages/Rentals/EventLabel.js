import React from 'react';
import PropTypes from 'prop-types'

export default class EventLabel extends React.Component {
  render() {
    const { label, svgComponent, view } = this.props

    return <div
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
  }
}

EventLabel.propTypes = {
  label: PropTypes.string,
  svgComponent: PropTypes.node,
  view: PropTypes.string.isRequired
}
