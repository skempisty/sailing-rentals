import React from 'react'
import styled from 'styled-components'
import { Tabs, Tab } from 'react-bootstrap'

import ContentWrapper from '../../shared/ContentWrapper'
import UsersTab from './UsersTab'
import CarouselTab from './CarouselTab'
import PostsTab from './PostsTab'
import BoatsTab from './BoatsTab'
import RentalsTab from './RentalsTab'
import ClassesTab from './ClassesTab'
import PaymentsTab from './PaymentsTab'
import SiteSettingsTab from './SiteSettingsTab'
import DryDockTab from './DryDockTab'

const StyledWrapper = styled.div`
  h1 {
    color: white;
  }
  
  [role='tab'] {
    color: white;
    
    &.disabled {
      color: grey;
    }
  }
`

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = { activeKey: 'users' }
  }

  render() {
    const { activeKey } = this.state

    return (
      <ContentWrapper>
        <StyledWrapper>
          <h1>Admin Panel</h1>

          <Tabs
            activeKey={activeKey}
            onSelect={(tab) => this.setState({ activeKey: tab })}
            variant='pills'
            style={{
              marginBottom: '1em',
              paddingBottom: '1em',
              borderBottom: '1px solid white'
            }}
            mountOnEnter
            unmountOnExit
          >
            <Tab eventKey='users' title='Users'>
              <UsersTab/>
            </Tab>

            <Tab eventKey='carousel' title='Carousel'>
              <CarouselTab/>
            </Tab>

            <Tab eventKey='posts' title='Posts'>
              <PostsTab/>
            </Tab>

            <Tab eventKey='boats' title='Boats'>
              <BoatsTab/>
            </Tab>

            <Tab eventKey='rentals' title='Rentals'>
              <RentalsTab/>
            </Tab>

            <Tab eventKey='classes' title='Classes'>
              <ClassesTab/>
            </Tab>

            <Tab eventKey='payments' title='Payments'>
              <PaymentsTab/>
            </Tab>

            <Tab eventKey='dry_dock' title='Dry Dock'>
              <DryDockTab/>
            </Tab>

            <Tab eventKey='site_settings' title='Site Settings'>
              <SiteSettingsTab/>
            </Tab>
          </Tabs>
        </StyledWrapper>
      </ContentWrapper>
    )
  }
}