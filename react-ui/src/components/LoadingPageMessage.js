import React from 'react';
import { Spinner } from "react-bootstrap";

export default class LoadingPageMessage extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '2em auto 0 auto'
        }}
      >
        <Spinner animation="border" />

        <span style={{ marginLeft: '1em' }}>Loading…</span>
      </div>
    )
  }
}
