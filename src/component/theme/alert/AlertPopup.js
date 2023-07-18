import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "@/feature/Hooks"
import { close } from "../../../feature/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function AlertPopup({ children }) {
  const alert = useAppSelector(state => state.alert)
  const dispatch = useAppDispatch()
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(close(false))
  }
  React.useEffect(() => {}, [alert])
  return (
    <>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  )
}
