import store from '../../index'

export default function getPostById(id) {
  if (!id) return {}

  const state = store.getState()

  const { posts } = state.posts

  return posts.find(post => post.id === Number(id))
}
