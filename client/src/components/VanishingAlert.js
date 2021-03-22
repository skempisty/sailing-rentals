import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'react-bootstrap';

import setStateAsync from '../utils/setStateAsync';

export default class VanishingAlert extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = { timedShow: false };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { showStart } = this.props;

    if (showStart && showStart !== prevProps.showStart) {
      await setStateAsync({ timedShow: true }, this);

      clearTimeout(this.timer);

      this.timer = this.vanishTimer;
    }
  }

  get vanishTimer() {
    const { vanishTimer } = this.props;

    return setTimeout(() => {
      this.setState({ timedShow: false });
    }, vanishTimer);
  }

  render() {
    const { variant, margin, padding, children } = this.props;
    const { timedShow } = this.state;

    return (
      <Alert
        variant={variant}
        style={{
          display: timedShow ? 'inline-block' : 'none',
          margin,
          padding
        }}
      >
        {children}
      </Alert>
    )
  }
}

VanishingAlert.propTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
  vanishTimer: PropTypes.number,
  variant: PropTypes.string.isRequired,
  showStart: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

VanishingAlert.defaultProps = {
  vanishTimer: 3000
}