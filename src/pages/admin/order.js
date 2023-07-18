import AdminLayout from "@/component/admin-component/AdminLayout"
import React, { useEffect, useState } from "react"
import OrderTab from "@/component/order/OrderTab"
export default function Order() {
  const [order, setOrder] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  useEffect(() => {
    const getOrder = async () => {
      const response = await fetch(
        "http://localhost:8080/api/order/getAllOrderAndOrderItem"
      )
      setOrder(await response.json())
    }
    const getOrderStatus = async () => {
      const response = await fetch(
        "http://localhost:8080/all/orderstatus/allOrderStatus"
      )
      setOrderStatus(await response.json())
    }
    getOrderStatus()
    getOrder()
  }, [])
  return (
    <AdminLayout>
      {orderStatus !== null ? (
        <OrderTab data={order} orderStatusList={orderStatus} />
      ) : null}
    </AdminLayout>
  )
}
