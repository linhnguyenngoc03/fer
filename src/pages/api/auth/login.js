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
        `http://localhost:8080/api/user/getUserByUserUid?userUid=${params.userUid}`
      )
      if (response.ok) {
        const data = await response.json()
        res.status(200).json({
          data: data,
          status: "success",
          message: "Success, Login success"
        })
      } else {
        res.status(200).json({
          data: null,
          status: "error",
          message: "Error, Login fail"
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
  