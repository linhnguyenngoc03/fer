export default async function Api(req, res) {
  req.method == "GET"
    ? null
    : res.status(400).json({
        data: null,
        status: "error",
        message: "error"
      })
  try {
    const params = req.query
    const response = await fetch(
      `http://localhost:8080/api/address/getAddressByUserUid?userUid=${params.userUid}`
    )
    if (response.status === 200) {
      const data = await response.json()
      res.status(200).json({
        data: data,
        status: "success",
        message: "success"
      })
    } else {
      res.status(200).json({
        data: [],
        status: "error",
        message: "Not found"
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
