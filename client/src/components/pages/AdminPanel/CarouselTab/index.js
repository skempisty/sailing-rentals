import React from 'react'
import { connect } from 'react-redux'

import { ReactSortable } from 'react-sortablejs'
import { Card, Button, Alert } from 'react-bootstrap'
import { FaPlusCircle, FaArrowCircleDown } from 'react-icons/fa'

import CarouselSlide from './CarouselSlide'

import FileUploader from '../../../shared/FileUploader'

import createCarouselSlide from '../../../../api/createCarouselSlide'
import rearrangeCarouselSlides from '../../../../api/rearrangeCarouselSlides'

import { addCarouselSlide } from '../../../../store/carouselSlides'

class CarouselTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { carouselSlides } = this.props

    return {
      sortableCarouselSlides: carouselSlides,
      uploadedImageUrl: '',
      previewRemoveTrigger: false
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { sortableCarouselSlides } = this.state

    const slideWasAdded = prevProps.carouselSlides.length < this.props.carouselSlides.length
    const slideWasRemoved = prevProps.carouselSlides.length > this.props.carouselSlides.length

    // slide has been added - add it to sortable slides as well
    if (slideWasAdded) {
      const plusOneSlide = sortableCarouselSlides.concat(this.props.carouselSlides[this.props.carouselSlides.length - 1])

      this.setState({ sortableCarouselSlides: plusOneSlide })
    }

    // slide deleted - update sortable slides accordingly
    if (slideWasRemoved) {
      const slideIdArray = this.props.carouselSlides.map(slide => slide.id)

      const slideRemoved = sortableCarouselSlides.filter(slide => slideIdArray.includes(slide.id))

      this.setState({ sortableCarouselSlides: slideRemoved })
    }

    const newSlidesString = getNormalizedSortedSlidesJsonString(this.props.carouselSlides)
    const oldSlidesString = getNormalizedSortedSlidesJsonString(sortableCarouselSlides)

    // slide edited - update sortable slides to match redux state
    if ((!slideWasAdded && !slideWasRemoved) && newSlidesString !== oldSlidesString) {
      this.setState({ sortableCarouselSlides: normalizeSlides(this.props.carouselSlides) })
    }

    // Have to make sure Slide objects have the same properties to compare properly
    function normalizeSlides(slidesArray) {
      return slidesArray.map(slide => {
        return {
          id: slide.id,
          imageUrl: slide.imageUrl,
          label: slide.label,
          subText: slide.subText
        }
      })
    }

    /*
     * Normalizes, then sorts a Slide array, before processing into JSON string.
     * Used to compare current vs previous state
     */
    function getNormalizedSortedSlidesJsonString(slidesArray) {
      return normalizeSlides(slidesArray)
        .slice()
        .sort((a, b) => {
          return a.id - b.id
        })
        .map(slide => JSON.stringify(slide))
        .join()
    }
  }

  async handleCarouselSort() {
    const { sortableCarouselSlides } = this.state

    const sortIdOrder = sortableCarouselSlides.map(slide => slide.id)

    try {
      await rearrangeCarouselSlides(sortIdOrder)
    } catch (error) {
      alert('Error rearranging slides')
    }
  }

  async handleSubmitClick() {
    const { addCarouselSlide } = this.props
    const { uploadedImageUrl, previewRemoveTrigger } = this.state

    try {
      const newSlide = await createCarouselSlide(uploadedImageUrl)

      addCarouselSlide({ newSlide })

      this.setState({
        uploadedImageUrl: '',
        previewRemoveTrigger: !previewRemoveTrigger
      })
    } catch (error) {
      alert(`Error adding carousel slide: ${error}`)
    }
  }

  render() {
    const { carouselSlides } = this.props
    const { sortableCarouselSlides, uploadedImageUrl, previewRemoveTrigger } = this.state

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1em'
          }}
        >
          <h3 style={{ color: 'white', margin: '0' }}>Homepage Carousel</h3>

          <Button
            variant='primary'
            disabled={!uploadedImageUrl}
            onClick={this.handleSubmitClick.bind(this)}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaPlusCircle/>

              <div style={{ marginLeft: '0.5em' }}>Submit New Slide</div>
            </div>
          </Button>
        </div>

        <Card style={{ marginBottom: '0.5em' }}>
          <FileUploader
            bucketDirectory='carousel'
            onFileChange={(downloadUrl) => this.setState({ uploadedImageUrl: downloadUrl })}
            onPreviewRemove={() => this.setState({ uploadedImageUrl: '' })}
            triggerPreviewRemove={previewRemoveTrigger}
          />
        </Card>

        {carouselSlides.length > 0 ?
          <React.Fragment>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5em',
                color: 'white'
              }}
            >
              <FaArrowCircleDown color='white'/>
              <span style={{ margin: '0 0.5em' }}>First Slide</span>
              <FaArrowCircleDown color='white'/>
            </div>

            <ReactSortable
              list={sortableCarouselSlides}
              setList={(newState) => this.setState({ sortableCarouselSlides: newState })}
              onSort={this.handleCarouselSort.bind(this)}
              animation='150'
              handle='.handle'
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              {sortableCarouselSlides.map((slide, index) =>
                <CarouselSlide
                  key={`slide-${index}-${slide.id}`}
                  slide={slide}
                />
              )}
            </ReactSortable>
          </React.Fragment>
          :
          <Alert
            variant='danger'
            style={{ display: 'inline-block' }}
          >
            No Homepage slides found - add some above or the site will not look great!
          </Alert>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { carouselSlides } = state.carouselSlides

  return { carouselSlides }
}

const mapDispatchToProps = {
  addCarouselSlide
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselTab)
