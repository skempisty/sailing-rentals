import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { Button, Card } from 'react-bootstrap'


class Post extends React.Component {
  shortenBody(body) {
    let truncatedText = body.substr(0, 100)

    if (truncatedText.length >= 100) {
      truncatedText = truncatedText + '…'
    }

    return truncatedText
  }

  render() {
    const { post, history } = this.props

    return (
      <Card
        style={{
          width: '16.25em',
          minWidth: '16.25em',
          marginRight: '1em',
          marginBottom: '1em'
        }}
      >
        <Card.Img
          variant='top'
          src={post.imageUrl}
        />

        <Card.Body>
          <Card.Title>{post.title}</Card.Title>

          <Card.Text>{this.shortenBody(post.body)}</Card.Text>

          <Button
            variant='primary'
            onClick={() => history.push(`/posts/${post.id}`)}
          >
            See more
          </Button>
        </Card.Body>
      </Card>
    )
  }
}

Post.propTypes = {
  label: PropTypes.string
}

export default withRouter(Post)