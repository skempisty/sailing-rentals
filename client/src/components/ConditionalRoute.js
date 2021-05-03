import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default class ConditionalRoute extends React.Component {
  render() {
    const { renderCondition } = this.props

    if (renderCondition) {
      return <Route {...this.props} />
    }
    return <Redirect to='/' />
  }
}

ConditionalRoute.propTypes = {
  renderCondition: PropTypes.bool
}
