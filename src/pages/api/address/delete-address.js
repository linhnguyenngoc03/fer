export default async function Api(req, res) {
  req.method == "POST"
    ? null
    : res.status(400).json({
        data: null,
        status: "error",
        message: "error"
      })
  try {
    const params = req.query
    const response = await fetch(
      `http://localhost:8080/api/address/deleteAddress?addressId=${params.addressId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      }
    )
    if (response.status === 200) {
      res.status(200).json({
        data: null,
        status: "success",
        message: "Success, Delete success"
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
