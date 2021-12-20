import React  from 'react'
import styled from 'styled-components'

import Flex from '../../shared/styled-system/Flex'
import Post from '../../shared/Post'

import isNotDeleted from '../../../utils/isNotDeleted'
import { breakpoints } from '../../../config'

import { usePosts } from '../../../store/posts'

const ResponsivenessWrapper = styled.div`
  div.posts-container {
    margin: 0 auto;
  
    & > div {
      justify-content: center;
    }

    div.card {
      margin: 0 0 1em 0;
    
      img {
        width: unset;
        max-height: 15em;
        max-width: 100%;
      }
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}) {
    div.cards-container {
      margin-top: -0.5em;

      div.card {
        max-width: 15em;
        margin: 0.5em;
      }
    }
  }
`

const Posts = () => {
  const { posts } = usePosts()

  return (
    <ResponsivenessWrapper>
      <div className='posts-container'>
        <Flex
          className='cards-container'
          flexWrap='wrap'
        >
          {posts.filter(isNotDeleted).map((post, index) =>
            <Post
              key={`post-${post.id}-${index}`}
              post={post}
            />
          )}
        </Flex>
      </div>
    </ResponsivenessWrapper>
  )
}

export default Posts
