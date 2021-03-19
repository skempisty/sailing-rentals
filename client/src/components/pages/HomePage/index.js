import React from 'react';
import { connect } from 'react-redux';
import { Carousel, Card, Button } from 'react-bootstrap';

import ContentWrapper from '../../ContentWrapper';

class HomePage extends React.Component {
  render() {
    const { carouselSlides, posts, history } = this.props;

    return (
      <React.Fragment>
        <Carousel controls={carouselSlides.length > 1}>
          {carouselSlides.map((slide, index) =>
            <Carousel.Item key={`carousel-slide-${slide.id}-${index}`}>
              <img
                className='d-block w-100'
                src={slide.img_src}
                style={{
                  height: '22.5em',
                  objectFit: 'cover'
                }}
                alt=''
              />

              <Carousel.Caption>
                <h3>{slide.label}</h3>
                <p>{slide.sub_text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        <ContentWrapper>
          <div style={{ margin: '0 auto', maxWidth: '45em' }}>
            <h2
              style={{
                marginBottom: '1em',
                color: 'white',
                textAlign: 'center'
              }}
            >
              News/Announcements
            </h2>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '1em auto 0 auto'
              }}
            >
              {posts.map((post, index) =>
                <Card style={{ width: '18rem' }} key={`post-${post.id}-${index}`}>
                  <Card.Img variant='top' src={post.img_src} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.short_description}</Card.Text>
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
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { carouselSlides, posts } = state.general;

  return { carouselSlides, posts };
};

export default connect(
  mapStateToProps,
  null
)(HomePage);