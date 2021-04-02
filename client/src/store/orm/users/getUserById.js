import store from '../../index'

export default function getUserById(id){
  const state = store.getState()

  const { users } = state.users

  return users.find(user => user.id === id)
}
