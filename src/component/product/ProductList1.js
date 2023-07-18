import React from "react"
import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"
import NavLink1 from "../theme/navLink/NavLink1"
import Title1 from "../theme/title/Title1"

export default function ProductList1({ categoryAndProduct, number }) {
  return (
    <>
      <Title1 title={categoryAndProduct.categoryName.toUpperCase()}>
        <NavLink1
          url={`/category/${categoryAndProduct.categoryId}`}
          text="xem thêm"
        />
      </Title1>
      <Grid container spacing={2}>
        {categoryAndProduct.productList.slice(0, number).map((product, key) => (
          <Grid item xs={12 / number} key={key}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
