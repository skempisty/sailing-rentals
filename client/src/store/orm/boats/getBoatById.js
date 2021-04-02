import store from '../../index'

export default function getBoatById(id){
  const state = store.getState()

  const { boats } = state.boats

  return boats.find(boat => boat.id === id)
}
