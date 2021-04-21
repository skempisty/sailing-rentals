import Constants from '../utils/constants'

export default async function getPosts() {
  const url = `${Constants.baseUrl}/api/posts`

  const postsRes = await fetch(url)

  return await postsRes.json()
}
