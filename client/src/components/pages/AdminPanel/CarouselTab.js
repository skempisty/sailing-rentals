import React from 'react'
import { connect } from 'react-redux'

import { ReactSortable } from 'react-sortablejs'
import { Card, Button, Alert } from 'react-bootstrap'
import { FaArrowsAltV, FaPlusCircle, FaArrowCircleDown } from 'react-icons/fa'

import FileUploader from '../../shared/FileUploader'

import createCarouselSlide from '../../../api/createCarouselSlide'
import rearrangeCarouselSlides from '../../../api/rearrangeCarouselSlides'

import { addCarouselSlide } from '../../../store/carouselSlides'

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

    // slide has been added - add it to sortable slides as well
    if (prevProps.carouselSlides.length < this.props.carouselSlides.length) {
      const plusOneSlide = sortableCarouselSlides.concat(this.props.carouselSlides[this.props.carouselSlides.length - 1])

      this.setState({ sortableCarouselSlides: plusOneSlide })
    }

    // TODO: handle delete slide similarly
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
              {sortableCarouselSlides.map((slide, index) => (
                <div
                  key={`slide-${index}-${slide.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    marginBottom: '0.5em'
                  }}
                >
                  <div
                    className='handle'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 0.25em',
                      background: '#343a3f',
                      borderTopLeftRadius: '5px',
                      borderBottomLeftRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaArrowsAltV color='white'/>
                  </div>

                  <img
                    src={slide.imageUrl}
                    style={{
                      height: '10em',
                      background: 'white' // for png backgrounds
                    }}
                    alt=''
                  />
                </div>
              ))}
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
