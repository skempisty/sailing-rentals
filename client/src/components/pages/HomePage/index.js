import React from 'react'
import { connect } from 'react-redux'

import { Carousel, Jumbotron, Card, Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import ContentWrapper from '../../shared/ContentWrapper'

class HomePage extends React.Component {
  shortenBody(body) {
    return body.substr(0, 100) + '…'
  }

  render() {
    const { carouselSlides, posts, history } = this.props

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

            <div style={{ width: '65%' }}>
              <div
                style={{
                  display: 'flex',
                  paddingLeft: '1.5em',
                  flexWrap: 'wrap'
                }}
              >
                {posts.map((post, index) =>
                  <Card
                    style={{
                      width: '16.25em',
                      minWidth: '16.25em',
                      marginRight: '1em',
                      marginBottom: '1em'
                    }}
                    key={`post-${post.id}-${index}`}
                  >
                    <Card.Img
                      variant='top'
                      src={post.imageUrl}
                    />

                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>

                      <Card.Text>{this.shortenBody(post.body)}</Card.Text>

                      <Button
                        variant='primary'
                        onClick={() => history.push(`/posts/${post.id}`)}
                      >
                        See more
                      </Button>
                    </Card.Body>
                  </Card>
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
  const { posts } = state.posts
  const { carouselSlides } = state.carouselSlides

  return { carouselSlides, posts }
}

export default connect(
  mapStateToProps,
  null
)(HomePage)