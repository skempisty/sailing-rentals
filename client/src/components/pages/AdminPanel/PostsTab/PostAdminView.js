import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FaEdit, FaBan } from 'react-icons/fa'

import DeletePostModal from './DeletePostModal'
import AddPostModal from './AddPostModal'

import Post from '../../../shared/Post'
import SelectMenu from '../../../shared/SelectMenu'
import SelectMenuItem from '../../../shared/SelectMenuItem'

class PostAdminView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showAddPostModal: false,
      showDeletePostModal: false
    }
  }

  render() {
    const { post } = this.props
    const { showAddPostModal, showDeletePostModal } = this.state

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AddPostModal
          post={post}
          show={showAddPostModal}
          onHide={() => this.setState({ showAddPostModal: false })}
        />

        <DeletePostModal
          post={post}
          show={showDeletePostModal}
          onHide={() => this.setState({ showDeletePostModal: false })}
        />

        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: '1'
            }}
          >
            <SelectMenu variant='dark'>
              <SelectMenuItem
                label='Edit'
                iconComponent={<FaEdit/>}
                callback={() => this.setState({ showAddPostModal: true })}
              />

              <SelectMenuItem
                label='Delete'
                iconComponent={<FaBan/>}
                callback={() => this.setState({ showDeletePostModal: true })}
              />
            </SelectMenu>
          </div>


          <Post post={post}/>
        </div>
      </div>
    )
  }
}

PostAdminView.propTypes = {
  post: PropTypes.object
}

export default connect(
  null,
  null
)(PostAdminView)
