import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FaEdit, FaBan, FaArrowsAltV } from 'react-icons/fa'

import DeleteSlideModal from './DeleteSlideModal'
import EditSlideModal from './EditSlideModal'

import SelectMenu from '../../../shared/SelectMenu'
import SelectMenuItem from '../../../shared/SelectMenuItem'

class CarouselSlide extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showEditSlideModal: false,
      showDeleteSlideModal: false
    }
  }

  render() {
    const { slide } = this.props
    const { showEditSlideModal, showDeleteSlideModal } = this.state

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EditSlideModal
          slide={slide}
          show={showEditSlideModal}
          onHide={() => this.setState({ showEditSlideModal: false })}
        />

        <DeleteSlideModal
          slide={slide}
          show={showDeleteSlideModal}
          onHide={() => this.setState({ showDeleteSlideModal: false })}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            marginRight: '1em',
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

        <SelectMenu variant='light'>
          <SelectMenuItem
            label='Edit'
            iconComponent={<FaEdit/>}
            callback={() => this.setState({ showEditSlideModal: true })}
          />

          <SelectMenuItem
            label='Delete'
            iconComponent={<FaBan/>}
            callback={() => this.setState({ showDeleteSlideModal: true })}
          />
        </SelectMenu>
      </div>
    )
  }
}

CarouselSlide.propTypes = {
  slide: PropTypes.object
}

export default connect(
  null,
  null
)(CarouselSlide)
