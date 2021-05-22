import React from 'react'
import styled from 'styled-components'

import { breakpoints } from '../../config'

const ResponsivenessWrapper = styled.div`
  div.content-wrapper {
    padding: 2em 2em 8em;
  }

  @media only screen and (min-width: ${breakpoints.desktop}) {
    div.content-wrapper {
      padding: 2em 5em 8em;
    }
  }
`

/**
 * Container component to wrap each page's content for style purposes
 */
export default class ContentWrapper extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <ResponsivenessWrapper>
        <div
          className='content-wrapper'
          style={{ margin: '0 auto', maxWidth: '92em' }}
        >
          {children}
        </div>
      </ResponsivenessWrapper>
    )
  }
}
