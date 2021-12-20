import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

import { Button, Jumbotron } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'

import { breakpoints } from '../../../config'

import { useSession } from '../../../store/session'

const ResponsivenessWrapper = styled.div`
  .mobile-call-to-action {
    display: ${({ $currentUserIsApproved }) => $currentUserIsApproved ? null : 'none'};
    
    button {
      width: 100%;
      height: 3em;
      marginBottom: 0.75em;
      fontSize: 1.5em;
    }
  }
  
  div.rent-call-to-action {
    display: none;
    
    p.click-here-to-begin {
      display: none;
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}) {
    div.rent-call-to-action {
      display: ${({ $currentUserIsApproved }) => $currentUserIsApproved ? 'flex' : 'none'};

      .jumbotron {
        width: 100%;
        margin-bottom: 1em;
        padding: 1em 2em;
      
        h1 { font-size: 1.5em; }
        
        button {
          width: 100%;
        }
      }
    }

    .mobile-call-to-action {
      display: none; 
    }
  }

  @media only screen and (min-width: ${breakpoints.desktop}) {
    div.rent-call-to-action {
      margin-right: 1em;
    
      .jumbotron {
        width: 25em;
        padding: 4em 2em;
        
        h1 {
          font-size: 2.5em;
        }
        
        button {
          width: unset;
        }
      }
    
      p.click-here-to-begin {
        display: block;
      }
    }
  }
`

const ApprovedUserCallToActions = () => {
  const history = useHistory()

  const { currentUser } = useSession()

  return (
    <ResponsivenessWrapper $currentUserIsApproved={!!currentUser.isApproved}>
      <Box className='mobile-call-to-action'>
        <Button onClick={() => history.push(`/rentals?showAddRentalModal=true`)}>
          <Flex justifyContent='center' alignItems='center'>
            <FaPlusCircle/>
            <div style={{ marginLeft: '0.5em' }}>Rent Sailboat</div>
          </Flex>
        </Button>

        <Button onClick={() => window.location.href = 'https://forms.gle/P8tyVrtKfkQVPccC7'} type='warning'>
          <Flex justifyContent='center' alignItems='center'>
            <FaPlusCircle/>
            <div style={{ marginLeft: '0.5em' }}>Trouble Tickets</div>
          </Flex>
        </Button>
      </Box>

      <div className='rent-call-to-action'>
        <Jumbotron>
          <h1>Sail with the NPSF Yacht Club</h1>

          <p className='click-here-to-begin'>
            Click here to begin
          </p>

          <p>
            <Button onClick={() => history.push(`/rentals?showAddRentalModal=true`)}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaPlusCircle/>
                <div style={{ marginLeft: '0.5em' }}>Rent Sailboat</div>
              </div>
            </Button>
          </p>
        </Jumbotron>
      </div>
    </ResponsivenessWrapper>
  )
}

export default ApprovedUserCallToActions
