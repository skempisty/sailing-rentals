import React from 'react'
import styled from 'styled-components'

import { FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa'

const StyledSocialMediaDiv = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ $margin }) => $margin || '0'};
  
  svg {
    color: white;
    cursor: pointer;
  
    &.facebook:hover {
      color: #8b9cc3;
    }
    
    &.instagram:hover { 
      color: #d72878;
    }
    
    &.discord:hover { 
      color: #5562ea;
    }
  }
`

/**
 * Common display for social media
 */
export default class SocialMediaBar extends React.Component {
  render() {
    const { margin } = this.props

    return (
      <StyledSocialMediaDiv
        $margin={margin}
      >
        {/* <a href='https://www.facebook.com/NPSFoundationYachtClub' target='_blank' rel='noopener noreferrer'>
          <FaFacebook
            className='facebook'
            size='1.5em'
            style={{ marginRight: '0.5em' }}
          />
        </a> */}

        <a href='https://www.instagram.com/npsfoundationyachtclub' target='_blank' rel='noopener noreferrer'>
          <FaInstagram
            className='instagram'
            size='1.5em'
            style={{ marginRight: '0.5em' }}
          />
        </a>

        {/* <a href='https://discord.gg/xCtugDqTDa' target='_blank' rel='noopener noreferrer'>
          <FaDiscord
            className='discord'
            size='1.5em'
          />
        </a> */}
      </StyledSocialMediaDiv>
    )
  }
}
