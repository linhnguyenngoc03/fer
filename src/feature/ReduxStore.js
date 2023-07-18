import { configureStore } from "@reduxjs/toolkit"
import alert from "./Alert"
// ...

export const store = configureStore({
  reducer: {
    alert: alert
  }
})

