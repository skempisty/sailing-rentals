import React from 'react'

import ContentWrapper from '../shared/ContentWrapper'

import getPostById from '../../store/orm/posts/getPostById'

export default class ShowPost extends React.Component {
  render() {
    const post = getPostById(this.props.match.params.id)

    return (
      <ContentWrapper>
        <React.Fragment>
          <h3>{post.title}</h3>

          <img
            src={post.imageUrl}
            alt=''
            style={{ maxHeight: '25em' }}
          />

          <div>{post.body}</div>
        </React.Fragment>
      </ContentWrapper>
    )
  }
}
