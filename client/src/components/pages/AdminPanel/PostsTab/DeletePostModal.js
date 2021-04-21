import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Modal } from 'react-bootstrap'

import deletePost from '../../../../api/deletePost'

import { removePost } from '../../../../store/posts'

class DeletePostModal extends React.Component {
  async handleConfirmDelete() {
    const { post, removePost } = this.props

    try {
      await deletePost(post.id)

      removePost({ id: post.id })
    } catch (error) {
      alert(`Error deleting post: ${error}`)
    }
  }

  render() {
    const { post, show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
          <img
            src={post.imageUrl}
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: '10em'
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Nevermind
          </Button>

          <Button
            variant='danger'
            onClick={this.handleConfirmDelete.bind(this)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  removePost
}

export default connect(
  null,
  mapDispatchToProps
)(DeletePostModal)

DeletePostModal.propTypes = {
  show: PropTypes.bool,
  post: PropTypes.object,
  onHide: PropTypes.func
}
