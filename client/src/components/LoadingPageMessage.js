import React from 'react'
import styled from 'styled-components'

import { Spinner} from 'react-bootstrap'

import logo from '../images/logo.png'

const LoadingMsgWrapper = styled.div`
  height: 100%;
  
  .loading-message {
    animation: animationFrames linear 1s;
    transform-origin: 50% 50%;
  }
  
  @keyframes animationFrames {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export default class LoadingPageMessage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {showLoadingMsg: false}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showLoadingMsg: true})
    }, 2000)
  }

  render() {
    const {showLoadingMsg} = this.state

    return (
      <React.Fragment>
        {showLoadingMsg &&
          <LoadingMsgWrapper>
            <div
              className='loading-message'
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
                  marginBottom: '10em',
                  padding: '2em',
                  background: 'rgba(52, 58, 63, 0.85)',
                  borderRadius: '30px',
                }}
              >
                <img src={logo} style={{width: '12em'}} alt=''/>

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
          </LoadingMsgWrapper>
        }
      </React.Fragment>
    )
  }
}
