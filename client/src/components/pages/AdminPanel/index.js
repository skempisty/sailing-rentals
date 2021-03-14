import React from 'react';
import { Tabs, Tab } from "react-bootstrap";

import LoadingPageMessage from '../../LoadingPageMessage';
import UsersTab from "./UsersTab";

import getCarouselSlides from '../../../api/getCarouselSlides';
import getPosts from "../../../api/getPosts";
import getUsers from "../../../api/getUsers";
import ContentWrapper from "../../ContentWrapper";

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);

    this.users = [];
    this.carouselSlides = [];
    this.posts = [];

    this.state = {
      activeKey: 'users',
      loadingPage: true
    }
  }

  async componentDidMount() {
    try {
      this.users = await getUsers();
      this.carouselSlides = await getCarouselSlides();
      this.posts = await getPosts();

      this.setState({loadingPage: false});
    } catch (err) {

    }
  }

  render() {
    const {loadingPage, activeKey} = this.state;
    const {users, carouselSlides, posts} = this;

    return (
      <ContentWrapper>
        {!loadingPage ?
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
            <Tab eventKey="users" title="Users">
              <UsersTab users={users}/>
            </Tab>

            <Tab eventKey="carousel" title="Carousel">
              Carousel
              {carouselSlides.map((slide, index) =>
                <div key={`slide-${index}`}>{slide.label}</div>
              )}
            </Tab>

            <Tab eventKey="posts" title="Posts" style={{ color: 'white' }}>
              Posts
              {posts.map((post, index) =>
                <div key={`post-${index}`}>{post.title}</div>
              )}
            </Tab>

            <Tab eventKey="boats" title="Boats" disabled />
            <Tab eventKey="calendar" title="Calendar" disabled />
          </Tabs>
          :
          <LoadingPageMessage/>
        }
      </ContentWrapper>
    )
  }
}