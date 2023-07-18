export default async function Api(req, res) {
  req.method == "POST"
    ? null
    : res.status(400).json({
        data: null,
        status: "error",
        message: "error"
      })
  try {
    const params = req.body
    const response = await fetch(
      `http://localhost:8080/api/cartItem/createCartItems`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          cartId: params.cartId,
          cartItemId: 0,
          productId: params.productId,
          quantity: 1
        })
      }
    )
    if (response.status === 200) {
      res.status(200).json({
        data: null,
        status: "success",
        message: "Success, Adding success"
      })
    } else {
      res.status(200).json({
        data: null,
        status: "error",
        message: "Fail"
      })
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: "error"
    })
  }
}
