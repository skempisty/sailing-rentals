import React from 'react'
import styled from 'styled-components'

import SocialMediaBar from './shared/SocialMediaBar'

import logo from '../images/logo.png'

import { breakpoints } from '../config'

const ResponsivenessWrapper = styled.div`
  .footer-inner {
    padding: 2em 2em;
  }

  @media only screen and (min-width: ${breakpoints.headerExpand}) {
    .footer-inner {
      padding: 2em 5em;
    }
  }
`

export default class Footer extends React.Component {
  render() {
    return (
      <ResponsivenessWrapper>
        <div
          className='footer-outer'
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            background: '#343a40'
          }}
        >
          <div
            className='footer-inner'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 auto'
            }}
          >
            <SocialMediaBar/>

            <div>
              <img src={logo} style={{ height: '2.5em' }} alt=''/>

              <span
                style={{
                  marginLeft: '0.5em',
                  color: '#fec114',
                  fontFamily: 'arial'
                }}
              >
                NPSF YACHT CLUB
              </span>
            </div>
          </div>
        </div>
      </ResponsivenessWrapper>
    )
  }
}
