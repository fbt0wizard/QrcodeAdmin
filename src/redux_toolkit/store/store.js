import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../slices/authSlice"
import dataSlice from "../slices/dataSlice"
import alertSlice from '../slices/alertSlice'
import otherSlice from '../slices/otherSlice'
import paginationSlice from '../slices/paginationSlice'

export const store = configureStore({
  reducer: {
    userData: userSlice,
    data: dataSlice,
    alert: alertSlice,
    others: otherSlice,
    pagination: paginationSlice
  },
})