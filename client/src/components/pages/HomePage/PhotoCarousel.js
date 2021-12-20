import React  from 'react'
import styled from 'styled-components'

import { Carousel } from 'react-bootstrap'

import isNotDeleted from '../../../utils/isNotDeleted'
import { breakpoints } from '../../../config'

import { useCarouselSlides } from '../../../store/carouselSlides'

const ResponsivenessWrapper = styled.div`
  div.carousel {
    display: none;
  }

  @media only screen and (min-width: ${breakpoints.tablet}) {
    div.carousel {
      display: block;
      
      img {
        height: 12.5em
      }
    }
  }

  @media only screen and (min-width: ${breakpoints.desktop}) {
    div.carousel {
      img {
        height: 22.5em
      }
    }
  }
`

const PhotoCarousel = () => {
  const { carouselSlides } = useCarouselSlides()

  const carouselSlidesToShow = carouselSlides.filter(isNotDeleted)

  const showCarouselControls = carouselSlidesToShow.length > 1

  return (
    <ResponsivenessWrapper>
      <Carousel
        controls={showCarouselControls}
        indicators={showCarouselControls}
      >
        {carouselSlidesToShow.map((slide, index) =>
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
    </ResponsivenessWrapper>
  )
}

export default PhotoCarousel
