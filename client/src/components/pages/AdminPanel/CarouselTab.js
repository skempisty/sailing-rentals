import React from 'react'
import { connect } from 'react-redux'

import { ReactSortable } from 'react-sortablejs';
import { Card } from 'react-bootstrap'
import { FaArrowsAltV } from 'react-icons/fa';

import FileUploader from '../../shared/FileUploader'

class CarouselTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { carouselSlides } = this.props

    return {
      carouselSlides,
      imageUrl: ''
    }
  }

  render() {
    const { carouselSlides, imageUrl } = this.state

    return (
      <React.Fragment>
        <Card style={{ marginBottom: '0.5em' }}>
          <FileUploader
            file={imageUrl}
            bucketDirectory='carousel'
            allowMultiple
            onFileChange={(downloadUrl) => this.setState({ uploadedImageUrl: downloadUrl })}
            onRemoveFileClick={() => this.setState({ imageUrl: '' })}
          />
        </Card>

        {carouselSlides.length > 0 ?
          <ReactSortable
            list={carouselSlides}
            setList={(newState) => this.setState({ carouselSlides: newState })}
            animation='150'
            handle='.handle'
            style={{ display: 'inline-flex', flexDirection: 'column' }}
          >
            {carouselSlides.map((slide, index) => (
              <div
                key={`slide-${index}-${slide.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5em',
                  background: '#343a3f',
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px'
                }}
              >
                <div
                  className="handle"
                  style={{
                    padding: '0 0.25em',
                    cursor: 'pointer'
                  }}
                >
                  <FaArrowsAltV color='white'/>
                </div>

                <img
                  src={slide.imageUrl}
                  style={{
                    height: '10em'
                  }}
                  alt=''
                />
              </div>
            ))}
          </ReactSortable>
          :
          <Card>hi</Card>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { carouselSlides } = state.carouselSlides

  return { carouselSlides }
}

export default connect(
  mapStateToProps,
  null
)(CarouselTab)
