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
      console.log(params)
  
      const cartItemsList = params.cartItemsList?.map(cartItem => {
        return {
          cartId: 0,
          cartItemId: cartItem.cartItemId,
          productId: cartItem.product.productId,
          quantity: cartItem.quantity
        }
      })
      const response = await fetch("http://localhost:8080/api/order/makeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartItemsList,
          deliveryAddressId: params.deliveryAddressId,
          note: "",
          paymentId: params.paymentId,
          totalPayment: params.totalPayment,
          userUid: params.userUid
        })
      })
  
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
  