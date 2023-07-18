import { CardMedia } from "@mui/material"
import React from "react"
import StyledLink from "../navLink/Link"

const UrlImage = ({ height, url, img }) => {
  return (
    <StyledLink href={url}>
      <CardMedia
        component="img"
        // Update with a meaningful value
        alt="Product Image"
        image={img}
        sx={{
          height: height,
          objectFit: "cover",
          objectPosition: "center"
        }}
      />
    </StyledLink>
  )
}

export default UrlImage