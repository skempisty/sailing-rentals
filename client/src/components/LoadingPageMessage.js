import React from 'react'
import { Spinner} from 'react-bootstrap'

import logo from '../images/logo.png'

export default class LoadingPageMessage extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2em',
            background: 'rgba(52, 58, 63, 0.85)',
            borderRadius: '30px',
          }}
        >
          <img src={logo} style={{ width: '12em' }} alt=''/>

          <Spinner
            animation='border'
            style={{
              marginTop: '1em',
              fontSize: '2em',
              color: 'white'
            }}
          />
        </div>
      </div>
    )
  }
}
