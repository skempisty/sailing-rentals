import React from 'react'
import styled from 'styled-components'

import ContentWrapper from '../../shared/ContentWrapper'

import PhotoCarousel from './PhotoCarousel'
import ApprovedUserCallToActions from './ApprovedUserCallToActions'
import Posts from './Posts'

import { breakpoints } from '../../../config'

import { useSession } from '../../../store/session'

const ResponsivenessWrapper = styled.div`
  div.rent-btn-and-posts-container {
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (min-width: ${breakpoints.desktop}) {
    div.rent-btn-and-posts-container {
      flex-direction: row;
      align-items: flex-start;
    }
  }
`

const HomePage = () => {
  const { currentUser } = useSession()

  return (
    <ResponsivenessWrapper>
      <PhotoCarousel/>

      <ContentWrapper>
        <div className='rent-btn-and-posts-container' style={{ display: 'flex' }}>
          {!!currentUser.isApproved &&
            <ApprovedUserCallToActions/>
          }

          <Posts/>
        </div>
      </ContentWrapper>
    </ResponsivenessWrapper>
  )
}

export default HomePage
