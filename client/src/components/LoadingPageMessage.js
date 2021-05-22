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

    this.stillLoading = React.createRef()

    this.state = { showLoadingMsg: false }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.stillLoading.current) {
        this.setState({ showLoadingMsg: true })
      }
    }, 2000)
  }

  render() {
    const { showLoadingMsg } = this.state

    return (
      <div ref={this.stillLoading} style={{ height: '100%' }}>
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
                  padding: '2em',
                  background: 'rgb(52, 58, 63)',
                  borderRadius: '30px',
                  color: 'white'
                }}
              >
                <img src={logo} style={{width: '12em'}} alt=''/>

                <h3>Loading</h3>

                <Spinner
                  animation='border'
                  style={{
                    marginTop: '0.25em',
                    fontSize: '2em'
                  }}
                />
              </div>
            </div>
          </LoadingMsgWrapper>
        }
      </div>
    )
  }
}
