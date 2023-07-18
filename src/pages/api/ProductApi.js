export const getProductListByNameApi = async productName => {
  console.log(productName)
  const response = await fetch(
    `http://localhost:8080/api/product/searchByName?productName=${productName}`
  )
  if (response.ok && productName !== "") {
    const productList = await response.json()
    return productList
  } else {
    return []
  }
}
export const getProductListByCategoryApi = async categoryId => {
  const response = await fetch(
    `http://localhost:8080/api/product/filterByCategory?categoryId=${categoryId}`
  )
  if (response.ok) {
    const productList = await response.json()
    return productList
  } else {
    return null
  }
}
export const getProductListApi = async () => {
  const response = await fetch(`http://localhost:8080/api/product/allProduct`)
  if (response.ok) {
    const productList = await response.json()
    return productList
  } else {
    return []
  }
}
export const getProductByProductIdApi = async productId => {
  const response = await fetch(
    `http://localhost:8080/api/product/getProductById?productId=${productId}`
  )
  if (response.ok) {
    const product = await response.json()
    return product
  } else {
    return null
  }
}
export const createProductApi = async (
  productName,
  categoryId,
  quantity,
  description,
  image,
  price
) => {
  const response = await fetch(
    "http://localhost:8080/api/product/createProduct",
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        categoryId: categoryId,
        dateCreate: "",
        dateUpdate: "",
        description: description,
        image: image,
        price: price,
        productId: 0,
        productName: productName,
        quantity: quantity,
        status: "mới"
      })
    }
  )
  if (response.ok) {
    return true
  }
}
export const updateProductApi = async (
  productName,
  categoryId,
  quantity,
  description,
  image,
  price,
  productId
) => {
  const response = await fetch(
    "http://localhost:8080/api/product/updateProduct",
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        categoryId: categoryId,
        dateCreate: "",
        dateUpdate: "",
        description: description,
        image: image,
        price: price,
        productId: productId,
        productName: productName,
        quantity: quantity,
        status: "bán chạy"
      })
    }
  )
  if (response.ok) {
    return true
  }
}
export const deleteProductApi = async productIdList => {
  const result = productIdList
    .map(productId => `productId=${productId}&`)
    .join("")
  const response = await fetch(
    `http://localhost:8080/api/product/deleteProduct?${result}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }
  )
  if (response.ok) {
    return true
  }
}
