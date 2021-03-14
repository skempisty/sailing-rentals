import React from 'react';

/**
 * Container component to wrap each page's content for style purposes
 */
export default class ContentWrapper extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div
        style={{
          padding: '2em 5em',
          height: '100%',
          background: '#004679'
        }}
      >
        {children}
      </div>
    )
  }
}
