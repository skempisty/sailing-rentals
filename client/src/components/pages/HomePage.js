import React from 'react';

export default class HomePage extends React.Component {
  componentDidMount() {
    console.log('home mounted')
  }

  render() {
    return (
      <React.Fragment>
        Homepage
      </React.Fragment>
    )
  }
}