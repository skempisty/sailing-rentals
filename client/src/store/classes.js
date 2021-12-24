import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAction } from '../utils/useAction'

import getClassesThunk from './thunks/getClassesThunk'
import getClassThunk from './thunks/getClassThunk'
import getClassRegistrationsThunk from './thunks/getClassRegistrationsThunk'
import getClassInfoThunk from './thunks/getClassInfoThunk'
import createClassThunk from './thunks/createClassThunk'
import createClassRegistrationThunk from './thunks/createClassRegistrationThunk'
import updateClassThunk from './thunks/updateClassThunk'
import deleteClassThunk from './thunks/deleteClassThunk'
import removeAddEditClassMeetingThunk from './thunks/removeAddEditClassMeetingThunk'

import Klass from '../models/Klass'

import AddClass from '../domains/views/AddClass'
import ClassDomain from '../domains/Klass'

const classSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    classRegistrations: [],
    classInfo: {
      html: 'some class info will go here',
      file: null
    },
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
    },
    setClassInfo: (state, action) => {
      state.classInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getClassesThunk.fulfilled, (state, action) => {
      state.classes = action.payload
    })
    builder.addCase(getClassThunk.fulfilled, (state, action) => {
      state.addEditClass = action.payload
    })
    builder.addCase(getClassRegistrationsThunk.fulfilled, (state, action) => {
      state.classRegistrations = action.payload
    })
    builder.addCase(getClassInfoThunk.fulfilled, (state, action) => {
      state.classInfo = action.payload
    })
    builder.addCase(createClassThunk.fulfilled, (state, action) => {
      const newClass = action.payload

      if (newClass.error) {
        state.addEditValidationErrorMsg = newClass.error
        return
      }

      state.classes.push(newClass)
    })
    builder.addCase(createClassRegistrationThunk.fulfilled, (state, action) => {
      state.classRegistrations.push(action.payload)
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

      const meetingsWithoutIndex = state.addEditClass.meetings.filter((mtg, index) => {
        return index !== deleteMtgIndex
      })

      state.addEditClass = {
        ...state.addEditClass,
        meetings: meetingsWithoutIndex
      }
    })
  }
})

const {
  setDefaultAddEditClass,
  updateAddEditClass,
  setClassInfo
} = classSlice.actions

export const useClasses = () => {
  const classes = useSelector(state => state.classes)

  return {
    ...classes,
    inProgressClasses: classes.classes.filter(ClassDomain.isInProgress),
    upcomingClasses: classes.classes.filter(ClassDomain.isUpcoming),
    pastClasses: classes.classes.filter(ClassDomain.isPast),
    setDefaultAddEditClass: useAction(setDefaultAddEditClass),
    updateAddEditClass: useAction(updateAddEditClass),
    setClassInfo: useAction(setClassInfo),
    getClassesThunk: useAction(getClassesThunk),
    getClassThunk: useAction(getClassThunk),
    getClassRegistrationsThunk: useAction(getClassRegistrationsThunk),
    getClassInfoThunk: useAction(getClassInfoThunk),
    createClassThunk: useAction(createClassThunk),
    createClassRegistrationThunk: useAction(createClassRegistrationThunk),
    updateClassThunk: useAction(updateClassThunk),
    deleteClassThunk: useAction(deleteClassThunk),
    removeAddEditClassMeetingThunk: useAction(removeAddEditClassMeetingThunk)
  }
}

export default classSlice.reducer
