import React from 'react'

import SocialMediaBar from './shared/SocialMediaBar'

import logo from '../images/logo.png'

export default class Footer extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          background: '#343a40'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            padding: '2em 5em',
            maxWidth: '92em'
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
    )
  }
}
