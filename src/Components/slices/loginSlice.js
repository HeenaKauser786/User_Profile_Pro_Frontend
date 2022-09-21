

import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 } 

const loginSlice = createSlice({
  name: 'login',
  initialState:initialState,
  reducers: {
    // increment(state) {
    //   state.value++
    // },
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action) {
    //   state.value += action.payload
    // },
  },
})

export const { } = loginSlice.actions
export default loginSlice