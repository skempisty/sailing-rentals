import { createSlice } from '@reduxjs/toolkit'

import Payment from '../models/Payment'

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    myPayments: [],
    allPayments: []
  },
  reducers: {
    initPayments: (state, action) => {
      const { myPayments, allPayments } = action.payload

      if (myPayments) state.myPayments = myPayments
      if (allPayments) state.allPayments = allPayments
    },
    addNewPayment: (state, action) => {
      const { newPayment } = action.payload

      state.myPayments.push(new Payment(newPayment))
      state.allPayments.push(new Payment(newPayment))
    },
    editPayment: (state, action) => {
      const { id, updatedPayment } = action.payload

      const myPaymentsIndex = state.myPayments.findIndex(payment => payment.id === id)
      const allPaymentsIndex = state.allPayments.findIndex(payment => payment.id === id)

      state.myPayments[myPaymentsIndex] = updatedPayment
      state.allPayments[allPaymentsIndex] = updatedPayment
    },
    removePayment: (state, action) => {
      const { id } = action.payload

      state.myPayments = state.myPayments.filter(payment => payment.id !== id)
      state.allPayments = state.allPayments.filter(payment => payment.id !== id)
    }
  }
})

export const {
  initPayments,
  addNewPayment,
  editPayment,
  removePayment
} = paymentSlice.actions

export default paymentSlice.reducer
