import { Paper, Grid } from "@mui/material"
import React from "react"
import ImageDetail from "@/component/theme/image/image2"
import ProductDetail from "@/component/product/detail/ProductDetail"
import Layout1 from "@/component/theme/layout/Layout1"
import ProductInformation from "@/component/product/detail/ProductInformation"
import { UseGetProductName } from "../../../package/function/product/use-get-name"

export async function getServerSideProps({ params }) {
  const name = params?.name
  if (name !== undefined && !Array.isArray(name)) {
    const response = await UseGetProductName({
      productName: name
    })
    const product = response.data
    return {
      props: {
        product: product ? product[0] : {}
      }
    }
  }
}
export default function DetailsCard({ product }) {
  return (
    <Layout1>
      <Paper
        sx={{
          padding: {
            lg: "3rem 6rem",
            sm: "0rem"
          }
        }}
      >
        <Grid container>
          <Grid
            item
            xs={5}
            sx={{
              padding: "2rem",
              border: "1px solid gray",
              borderRadius: "1rem"
            }}
          >
            <ImageDetail img={product.image} />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
            <ProductDetail product={product} />
          </Grid>
        </Grid>
        <ProductInformation />
      </Paper>
    </Layout1>
  )
}
