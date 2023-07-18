import WidgetsIcon from "@mui/icons-material/Widgets"
import React from "react"

const StyledWidgets = ({ size, marginRight, color }) => {
  return (
    <WidgetsIcon
      sx={{
        width: size,
        height: size,
        marginRight: marginRight,
        color: color
      }}
    />
  )
}

export { StyledWidgets }
