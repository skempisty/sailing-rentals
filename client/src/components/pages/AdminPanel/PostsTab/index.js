import React from 'react'
import { connect } from 'react-redux'

import { Alert, Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import AddPostModal from './AddPostModal'
import PostAdminView from './PostAdminView'

class PostsTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showAddPostModal: false }
  }

  render() {
    const { posts } = this.props
    const { showAddPostModal } = this.state

    return (
      <React.Fragment>
        <AddPostModal
          show={showAddPostModal}
          onHide={() => this.setState({ showAddPostModal: false })}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1em'
          }}
        >
          <h3 style={{ color: 'white', margin: '0' }}>Posts</h3>

          <Button
            variant='primary'
            onClick={() => this.setState({ showAddPostModal: true })}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaPlusCircle/>

              <div style={{ marginLeft: '0.5em' }}>Make a Post</div>
            </div>
          </Button>
        </div>

        {posts.length > 0 ?
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {posts.map((post, index) =>
              <PostAdminView
                key={`post-${post.id}-${index}`}
                post={post}
              />
            )}
          </div>
          :
          <Alert
            variant='danger'
            style={{display: 'inline-block'}}
          >
            No Posts found - the homepage is looking a little bare
          </Alert>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state.posts

  return { posts }
}

export default connect(
  mapStateToProps,
  null
)(PostsTab)
