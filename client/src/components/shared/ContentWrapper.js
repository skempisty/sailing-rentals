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
          margin: '0 auto',
          padding: '2em 5em 8em',
          maxWidth: '92em'
        }}
      >
        {children}
      </div>
    )
  }
}
