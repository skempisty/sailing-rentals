import React from 'react'

import ContentWrapper from '../shared/ContentWrapper'

import getPostById from '../../store/orm/posts/getPostById'

export default class ShowPost extends React.Component {
  render() {
    const post = getPostById(this.props.match.params.id)

    return (
      <ContentWrapper>
        <div style={{ color: 'white' }}>
          <h3>{post.title}</h3>

          <img
            src={post.imageUrl}
            alt=''
            style={{
              margin: '0.5em 0 1em 0',
              maxHeight: '25em'
            }}
          />

          <div>{post.body}</div>
        </div>
      </ContentWrapper>
    )
  }
}
