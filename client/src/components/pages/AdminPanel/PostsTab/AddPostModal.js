import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Form, Modal } from 'react-bootstrap'

import FileUploader from '../../../shared/FileUploader'

import createPost from '../../../../api/createPost'
import updatePost from '../../../../api/updatePost'
import Post from '../../../../models/Post'

import { addPost, editPost } from '../../../../store/posts'

class AddPostModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialState
  }

  get initialState() {
    const { post } = this.props

    const postObj = new Post({
      title: post ? post.title : '',
      body: post ? post.body : '',
      imageUrl: post ? post.imageUrl : ''
    })

    return {
      ...postObj,
      uploadedImageUrl: ''
    }
  }

  get postToSubmit() {
    const { title, body, imageUrl, uploadedImageUrl } = this.state

    return {
      title,
      body,
      imageUrl: uploadedImageUrl || imageUrl
    }
  }

  async handleSavePostClick() {
    const { post, addPost, editPost } = this.props

    try {
      if (post) {
        const updatedPost = await updatePost(post.id, this.postToSubmit)

        editPost({ updatedPost: new Post({
          id: updatedPost.id,
          title: updatedPost.title,
          body: updatedPost.body,
          imageUrl: updatedPost.imageUrl
        })})
      } else {
        const newPost = await createPost(this.postToSubmit)

        addPost({ post: new Post({
          id: newPost.id,
          title: newPost.title,
          body: newPost.body,
          imageUrl: newPost.imageUrl
        })})
      }
    } catch (error) {
      alert(`Error saving post: ${error}`)
    } finally {
      this.resetAndHide()
    }
  }

  resetAndHide() {
    const { onHide } = this.props

    this.setState(this.initialState)
    onHide()
  }

  render() {
    const { show, post } = this.props
    const { title, body, imageUrl } = this.state

    return (
      <Modal show={show} onHide={this.resetAndHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{post ? 'Edit Post' : 'Add Post'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form style={{ display: 'flex' }}>
            <div style={{ minWidth: '15em' }}>
              <Form.Group>
                <Form.Label><b>Title</b></Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Post title'
                  value={title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label><b>Body</b></Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Post body'
                  value={body}
                  onChange={(e) => this.setState({ body: e.target.value })}
                />
              </Form.Group>
            </div>

            <div style={{ paddingLeft: '1em', width: '100%' }}>
              <Form.Label><b>Image</b></Form.Label>

              <FileUploader
                file={imageUrl}
                bucketDirectory='posts'
                onFileChange={(downloadUrl) => this.setState({ uploadedImageUrl: downloadUrl })}
                onRemoveFileClick={() => this.setState({ imageUrl: '' })}
              />
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={this.resetAndHide.bind(this)}>
            Cancel
          </Button>

          <Button variant='primary' onClick={this.handleSavePostClick.bind(this)}>
            {post ? 'Save Changes' : 'Add Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  addPost,
  editPost
}

export default connect(
  null,
  mapDispatchToProps
)(AddPostModal)

AddPostModal.propTypes = {
  show: PropTypes.bool,
  post: PropTypes.object,
  onHide: PropTypes.func
}
