import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAction } from '../utils/useAction'

import getClassesThunk from './thunks/getClassesThunk'
import createClassThunk from './thunks/createClassThunk'
import updateClassThunk from './thunks/updateClassThunk'

const classSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    classMeetings: [],
    classRegistrations: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClassesThunk.fulfilled, (state, action) => {
      state.classes = action.payload
    })
    builder.addCase(createClassThunk.fulfilled, (state, action) => {
      const newClass = action.payload

      state.classes.push(newClass)
    })
    builder.addCase(updateClassThunk.fulfilled, (state, action) => {
      const updatedClass = action.payload

      const classIndex = state.classes.findIndex(klass => klass.id === updatedClass.id)

      state.classes[classIndex] = updatedClass
    })
  }
})

export const useClasses = () => {
  const classes = useSelector(state => state.classes)

  return {
    ...classes,
    getClassesThunk: useAction(getClassesThunk),
    createClassThunk: useAction(createClassThunk),
    updateClassThunk: useAction(updateClassThunk)
  }
}

export default classSlice.reducer
