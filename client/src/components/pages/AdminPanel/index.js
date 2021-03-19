import React from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from 'react-bootstrap';

import ContentWrapper from '../../ContentWrapper';
import UsersTab from './UsersTab';
import CarouselTab from './CarouselTab';
import PostsTab from './PostsTab';
import BoatsTab from './BoatsTab';
import RentalsTab from './RentalsTab';

const StyledWrapper = styled.div`
  [role='tab'] {
    color: white;
    
    &.disabled {
      color: grey;
    }
  }
`;

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeKey: 'users' };
  }

  render() {
    const { activeKey } = this.state;

    return (
      <ContentWrapper>
        <StyledWrapper>
          <Tabs
            activeKey={activeKey}
            onSelect={(tab) => this.setState({activeKey: tab})}
            variant='pills'
            style={{
              marginBottom: '1em',
              paddingBottom: '1em',
              borderBottom: '1px solid white'
            }}
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
          </Tabs>
        </StyledWrapper>
      </ContentWrapper>
    )
  }
}