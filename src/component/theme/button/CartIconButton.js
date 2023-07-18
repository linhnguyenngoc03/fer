import React from "react"
import { IconButton } from "@mui/material"
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore"
import StyledLink from "../navLink/Link"
import { setup } from "@/config/setup"
export default function CartIconButton({ url, number, ...props }) {
  return (
    <StyledLink href={url}>
      <IconButton
        {...props}
        size="large"
        sx={{
          color: "white",
          backgroundColor: setup.border
        }}
      >
        {/* <Badge color="error" badgeContent={number}> */}
        <LocalGroceryStoreIcon />
        {/* </Badge> */}
      </IconButton>
    </StyledLink>
  )
}

