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
      `http://localhost:8080/api/order/getOrderById?orderId=${params.orderId}`
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



// const data = {
//     orderId: 10,
//     user: {
//       userId: 26,
//       userRole: 0,
//       userName: "Lý Anh Kiệt",
//       userUid: "V6ErIOhWTrRPpppnGPyG4MkmwQs2",
//       email: "test1@gmail.com",
//       phoneNumber: "0898124853",
//       note: "string",
//     },
//     payment: {
//       paymentId: 2,
//       paymentType: "Thanh toán khi nhận hàng",
//     },
//     orderDate: "2023-06-22",
//     delivery: {
//       deliveryId: 10,
//       address:
//         "Địa chỉ: 123 lê văn khương, Phường xã: Mông Ân, Quận huyện: Bảo Lâm,Thành phố: Cao Bằng",
//     },
//     orderStatus: {
//       statusId: 1,
//       status: "Đang xử lý",
//     },
//     note: "",
//     totalPayment: 160000,
//     paymentDate: null,
//     productAndOrderItemList: [
//       {
//         orderItemId: 6,
//         quantity: 1,
//         product: {
//           productId: 25,
//           productName: "Combo 4 huy hiệu cài áo Vô diện",
//           price: 100000,
//           quantity: 89,
//           categoryId: 3,
//           status: "",
//           description:
//             "Spirit Away - No Face Man - 100% hàng mới và chất lượng cao",
//           image: "23.jpg",
//           dateCreate: "2022-05-18",
//           dateUpdate: "2023-07-02",
//         },
//       },
//       {
//         orderItemId: 7,
//         quantity: 1,
//         product: {
//           productId: 26,
//           productName: "Huy hiệu cài áo Khủng long ",
//           price: 30000,
//           quantity: 54,
//           categoryId: 3,
//           status: "",
//           description:
//             "Huy hiệu/Pin/Ghim trang trí Balo, cài áo chủ đề Giáng sinh",
//           image: "24.jpg",
//           dateCreate: "2022-05-18",
//           dateUpdate: "2023-07-02",
//         },
//       },
//     ],
//   };
  