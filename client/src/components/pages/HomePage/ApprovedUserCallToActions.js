import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

import { Button, Jumbotron } from 'react-bootstrap'
import { FaHammer, FaPlusCircle } from 'react-icons/fa'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'

import { breakpoints } from '../../../config'

import { useSession } from '../../../store/session'

const ResponsivenessWrapper = styled.div`
  width: 100%;

  .mobile-call-to-action {
    display: ${({ $currentUserIsApproved }) => $currentUserIsApproved ? null : 'none'};
    
    button {
      width: 100%;
      height: 3em;
      marginBottom: 0.75em;
    }
  }
  
  div.rent-call-to-action {
    display: none;
    column-gap: 0.5em;
    
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
        <Button
          onClick={() => history.push(`/rentals?showAddRentalModal=true`)}
          style={{ fontSize: '1.5em' }}
        >
          <Flex justifyContent='center' alignItems='center'>
            <FaPlusCircle/>
            <Text marginLeft='0.5em'>Rent Sailboat</Text>
          </Flex>
        </Button>

        <Button
          variant='warning'
          onClick={() => window.open('https://forms.gle/P8tyVrtKfkQVPccC7', '_blank')}
          style={{ marginTop: '0.5em', fontSize: '1.5em' }}
        >
          <Flex justifyContent='center' alignItems='center'>
            <FaHammer/>
            <Text marginLeft='0.5em'>Trouble Tickets</Text>
          </Flex>
        </Button>
      </Box>

      <Flex className='rent-call-to-action'>
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

          <Button
            variant='warning'
            onClick={() => window.open('https://forms.gle/P8tyVrtKfkQVPccC7', '_blank')}
          >
            <Flex justifyContent='center' alignItems='center'>
              <FaHammer/>
              <Text marginLeft='0.5em'>Trouble Tickets</Text>
            </Flex>
          </Button>
        </Jumbotron>
      </Flex>
    </ResponsivenessWrapper>
  )
}

export default ApprovedUserCallToActions
