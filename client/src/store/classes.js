import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAction } from '../utils/useAction'

import getClassesThunk from './thunks/getClassesThunk'
import getClassThunk from './thunks/getClassThunk'
import createClassThunk from './thunks/createClassThunk'
import updateClassThunk from './thunks/updateClassThunk'
import deleteClassThunk from './thunks/deleteClassThunk'
import removeAddEditClassMeetingThunk from './thunks/removeAddEditClassMeetingThunk'

import Klass from '../models/Klass'

import AddClass from '../domains/views/AddClass'

const classSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    classRegistrations: [],
    addEditClass: new Klass(),
    addEditValidationErrorMsg: null
  },
  reducers: {
    setDefaultAddEditClass: (state) => {
      state.addEditClass = AddClass.defaultClass
    },
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

      if (newClass.error) {
        state.addEditValidationErrorMsg = newClass.error
        return
      }

      state.classes.push(newClass)
    })
    builder.addCase(updateClassThunk.fulfilled, (state, action) => {
      const updatedClass = action.payload

      const classIndex = state.classes.findIndex(klass => klass.id === updatedClass.id)

      state.classes[classIndex] = updatedClass
    })
    builder.addCase(deleteClassThunk.fulfilled, (state, action) => {
      const deletedClassId = action.meta.arg

      state.classes = state.classes.filter(klass => klass.id !== deletedClassId)
    })
    builder.addCase(removeAddEditClassMeetingThunk.fulfilled, (state, action) => {
      const { deleteMtgIndex } = action.payload

      state.addEditClass.meetings.splice(deleteMtgIndex, 1)
    })
  }
})

const {
  setDefaultAddEditClass,
  updateAddEditClass
} = classSlice.actions

export const useClasses = () => {
  const classes = useSelector(state => state.classes)

  return {
    ...classes,
    setDefaultAddEditClass: useAction(setDefaultAddEditClass),
    updateAddEditClass: useAction(updateAddEditClass),
    getClassesThunk: useAction(getClassesThunk),
    getClassThunk: useAction(getClassThunk),
    createClassThunk: useAction(createClassThunk),
    updateClassThunk: useAction(updateClassThunk),
    deleteClassThunk: useAction(deleteClassThunk),
    removeAddEditClassMeetingThunk: useAction(removeAddEditClassMeetingThunk)
  }
}

export default classSlice.reducer
