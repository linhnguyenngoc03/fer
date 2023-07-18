import { createSlice } from "@reduxjs/toolkit"

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    open: false,
    message: "",
    severity: "success"
  },
  reducers: {
    setOpen: (state, action) => {
      return action.payload
    },
    close: (state, action) => {
      state.open = action.payload
    }
  }
})
export const { setOpen, close } = alertSlice.actions
export const selectAlert = state => state.alert
export default alertSlice.reducer
