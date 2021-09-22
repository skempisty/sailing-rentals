import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAction } from '../utils/useAction'

import getClassesThunk from './thunks/getClassesThunk'
import getClassThunk from './thunks/getClassThunk'
import createClassThunk from './thunks/createClassThunk'
import updateClassThunk from './thunks/updateClassThunk'

import Klass from '../models/Klass'

const classSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    classRegistrations: [],
    addEditClass: new Klass()
  },
  reducers: {
    updateAddEditClass: (state, action) => {
      const updateFields = action.payload

      state.addEditClass = {
        ...state.addEditClass,
        ...updateFields
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getClassesThunk.fulfilled, (state, action) => {
      state.classes = action.payload
    })
    builder.addCase(getClassThunk.fulfilled, (state, action) => {
      state.addEditClass = action.payload
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

const {
  updateAddEditClass
} = classSlice.actions

export const useClasses = () => {
  const classes = useSelector(state => state.classes)

  return {
    ...classes,
    updateAddEditClass: useAction(updateAddEditClass),
    getClassesThunk: useAction(getClassesThunk),
    getClassThunk: useAction(getClassThunk),
    createClassThunk: useAction(createClassThunk),
    updateClassThunk: useAction(updateClassThunk)
  }
}

export default classSlice.reducer
