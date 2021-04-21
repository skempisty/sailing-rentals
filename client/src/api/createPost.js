import Constants from '../utils/constants'

/**
 * Create a post
 * @param {Object} post specs to tell backend what the new post should be
 * @return {Promise<Post>} the newly created Post object
 */
export default async function createPost(post) {
  const url = `${Constants.baseUrl}/api/posts`

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ post })
  }

  const postRes = await fetch(url, postOptions)

  return await postRes.json()
}