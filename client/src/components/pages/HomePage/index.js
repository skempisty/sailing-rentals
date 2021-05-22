import React from 'react'
import { connect } from 'react-redux'

import { Carousel, Jumbotron, Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import ContentWrapper from '../../shared/ContentWrapper'
import Post from '../../shared/Post'

class HomePage extends React.Component {
  shortenBody(body) {
    return body.substr(0, 100) + '…'
  }

  render() {
    const { currentUser, carouselSlides, posts, history } = this.props

    return (
      <React.Fragment>
        <Carousel controls={carouselSlides.length > 1}>
          {carouselSlides.map((slide, index) =>
            <Carousel.Item key={`carousel-slide-${slide.id}-${index}`}>
              <img
                className='d-block w-100'
                src={slide.imageUrl}
                style={{
                  height: '22.5em',
                  objectFit: 'cover'
                }}
                alt=''
              />

              <Carousel.Caption>
                <h3>{slide.label}</h3>
                <p>{slide.subText}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        <ContentWrapper>
          <div style={{ display: 'flex' }}>
            {!!currentUser.isApproved &&
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  width: '35%'
                }}
              >

                <Jumbotron style={{ width: '100%' }}>
                  <h1>Sail with the NPSF Yacht Club</h1>
                  <p>
                    Click below to begin
                  </p>
                  <p>
                    <Button onClick={() => history.push(`/rentals?showAddRentalModal=true`)}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FaPlusCircle/>
                        <div style={{ marginLeft: '0.5em' }}>Rent a sailboat</div>
                      </div>
                    </Button>
                  </p>
                </Jumbotron>
              </div>
            }

            <div style={{ width: !!currentUser.isApproved ? '65%' : null }}>
              <div
                style={{
                  display: 'flex',
                  paddingLeft: '1.5em',
                  flexWrap: 'wrap'
                }}
              >
                {posts.map((post, index) =>
                  <Post
                    key={`post-${post.id}-${index}`}
                    post={post}
                    margin='0 1em 1em 0'
                  />
                )}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.session
  const { posts } = state.posts
  const { carouselSlides } = state.carouselSlides

  return { currentUser, carouselSlides, posts }
}

export default connect(
  mapStateToProps,
  null
)(HomePage)