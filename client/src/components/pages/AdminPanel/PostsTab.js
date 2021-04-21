import React from 'react'
import { connect } from 'react-redux'

import { Alert, Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

class PostsTab extends React.Component {
  render() {
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
          <h3 style={{ color: 'white', margin: '0' }}>Posts</h3>

          <Button
            variant='primary'
            onClick={() => this.setState({ showNewPostModal: true })}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaPlusCircle/>

              <div style={{ marginLeft: '0.5em' }}>Make a Post</div>
            </div>
          </Button>
        </div>

        <Alert
          variant='danger'
          style={{ display: 'inline-block' }}
        >
          No Posts found - the homepage is looking a little bare
        </Alert>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  null
)(PostsTab)
