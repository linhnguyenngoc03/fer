import { Grid } from "@mui/material"
import React from "react"
import ProductSkeleton from "./ProductSeleton"

export default function ProductListSkeleton({ row, col }) {
  const skeletons = []
  const createSkeleton = (row, col) => {
    for (let i = 0; i < row * col; i++) {
      skeletons.push(
        <Grid item xs={12 / col} key={i}>
          <ProductSkeleton />
        </Grid>
      )
    }
  }
  createSkeleton(row, col)
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginBottom: "1rem"
      }}
    >
      {skeletons}
    </Grid>
  )
}
