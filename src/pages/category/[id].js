import Layout1 from "@/component/theme/layout/Layout1"
import React from "react"

import ProductList2 from "@/component/product/ProductList2"
import Title1 from "@/component/theme/title/Title1"
import { categoryList } from "@/config/setup"
import { UseGetProductCategory } from "../../../package/function/product/use-get-category"

export async function getServerSideProps({ params }) {
  const id = params?.id
  if (id !== undefined && !Array.isArray(id)) {
    const response = await UseGetProductCategory({
      categoryId: Number.parseInt(id, 10)
    })
    const category = categoryList.find(
      item => Number.parseInt(id) === item.categoryId
    )
    const productList = response.data
    return {
      props: {
        productList: productList ? productList : [],
        title: category?.categoryName
      }
    }
  }
}
export default function Category({ productList, title }) {
  return (
    <Layout1>
      <Title1 title={title.toUpperCase()} />
      <ProductList2 productList={productList} row={3} col={4} />
    </Layout1>
  )
}
