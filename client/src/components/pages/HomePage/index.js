import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Carousel, Jumbotron, Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import ContentWrapper from '../../shared/ContentWrapper'
import Post from '../../shared/Post'

import { breakpoints } from '../../../config'

const ResponsivenessWrapper = styled.div`
  div.carousel {
    display: none;
  }
  
  div.rent-btn-and-posts-container {
    flex-direction: column;
    align-items: center;
  }
  
  .mobile-rent-call-to-action {
    display: ${({ $currentUserIsApproved }) => $currentUserIsApproved ? null : 'none'};
  }
  
  div.rent-call-to-action {
    display: none;
    
    p.click-here-to-begin {
      display: none;
    }
  }
  
  div.posts-container {
    margin: 0 auto;
  
    & > div {
      justify-content: center;
    }

    div.card {
      margin: 0 0 1em 0;
    
      img {
        width: unset;
        max-height: 15em;
        max-width: 100%;
      }
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}) {
    div.carousel {
      display: unset;
      
      img {
        height: 12.5em
      }
    }

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

    .mobile-rent-call-to-action {
      display: none; 
    }

    div.cards-container {
      margin-top: -0.5em;

      div.card {
        max-width: 15em;
        margin: 0.5em;
      }
    }
  }

  @media only screen and (min-width: ${breakpoints.desktop}) {
    div.carousel {
      img {
        height: 22.5em
      }
    }
    
    div.rent-btn-and-posts-container {
      flex-direction: row;
      align-items: flex-start;
      
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
  }
`

class HomePage extends React.Component {
  shortenBody(body) {
    return body.substr(0, 100) + '…'
  }

  render() {
    const { currentUser, carouselSlides, posts, history } = this.props

    return (
      <ResponsivenessWrapper $currentUserIsApproved={!!currentUser.isApproved}>
        <Carousel controls={carouselSlides.length > 1}>
          {carouselSlides.map((slide, index) =>
            <Carousel.Item key={`carousel-slide-${slide.id}-${index}`}>
              <img
                className='d-block w-100'
                src={slide.imageUrl}
                style={{ objectFit: 'cover' }}
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
          <div className='rent-btn-and-posts-container' style={{ display: 'flex' }}>
            {!!currentUser.isApproved &&
              <React.Fragment>
                <Button
                  style={{
                    width: '100%',
                    height: '3em',
                    marginBottom: '0.75em',
                    fontSize: '1.5em'
                  }}
                  className='mobile-rent-call-to-action'
                  onClick={() => history.push(`/rentals?showAddRentalModal=true`)}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaPlusCircle/>
                    <div style={{ marginLeft: '0.5em' }}>Rent Sailboat</div>
                  </div>
                </Button>

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
              </React.Fragment>
            }

            <div className='posts-container'>
              <div
                className='cards-container'
                style={{
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {posts.map((post, index) =>
                  <Post
                    key={`post-${post.id}-${index}`}
                    post={post}
                  />
                )}
              </div>
            </div>
          </div>
        </ContentWrapper>
      </ResponsivenessWrapper>
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