import React, { useContext, useEffect, useState } from "react"
import { Grid, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import Layout1 from "@/component/theme/layout/Layout1"
import { UserContext } from "@/component/auth/AuthContext"
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user"
import { UseGetPaymentList } from "../../../package/function/payment/use-get-all"
import { UseGetAddressUserUid } from "../../../package/function/address/use-get-user"
import { UseLogin } from "../../../package/function/auth/use-login"
import { UseCreateOrder } from "../../../package/function/order/create"
import { useAppDispatch } from "@/feature/Hooks"
import { setOpen } from "@/feature/Alert"
import { useRouter } from "next/router"
import CheckoutAddress from "@/component/checkout/Address"
import CheckoutCartTable from "@/component/checkout/CheckoutCartTable"
import CheckoutPayment from "@/component/checkout/Payment"
import CheckoutInfor from "@/component/checkout/Infor"
import { createPaymentUrl } from "../../../package/function/cart/VNPAY"

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug
  let orderList = []
  let total = 0
  let paymentList = []
  let addressList = []
  let user = null
  try {
    if (slug !== undefined) {
      const orderIds = slug[0].split(",")
      const response = await UseGetCartUserUid({ userUid: slug[2] })
      orderList = response.data?.productAndCartItemList.filter(cartItem =>
        orderIds.includes(cartItem.cartItemId.toString())
      )
      total = Number.parseInt(slug[1])
      const response2 = await UseGetAddressUserUid({ userUid: slug[2] })
      addressList = response2.data
      const response3 = await UseLogin({ userUid: slug[2] })
      user = response3.data
    }
    const response1 = await UseGetPaymentList()
    paymentList = response1.data
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      orderList,
      total,
      paymentList,
      addressList,
      user
    }
  }
}

const Order = ({ orderList, total, paymentList, addressList, user }) => {
  const [selectAddress, setSelectAddress] = useState(null)
  const [selectPayment, setSelectPayment] = useState(null)
  const dispatch = useAppDispatch()
  const { handleSubmit } = useForm()
  const { setOpenLoading, openLoading } = useContext(UserContext)
  const router = useRouter()
  const { vnp_TransactionStatus } = router.query
  useEffect(() => {
    const handleCreateOrder = async () => {
      try {
        setOpenLoading(true)
        const addressId = localStorage.getItem("addressId")
        const paymentId = localStorage.getItem("paymentId")
        const response = await UseCreateOrder({
          cartItemsList: orderList,
          deliveryAddressId: Number.parseInt(
            addressId !== null ? addressId : "-1"
          ),
          paymentId: Number.parseInt(paymentId !== null ? paymentId : "-1"),
          totalPayment: total,
          userUid: user?.userUid
        })
        dispatch(
          setOpen({
            open: true,
            message: response.message,
            severity: response.status
          })
        )
      } catch (error) {
        dispatch(
          setOpen({
            open: true,
            message: error.message,
            severity: "error"
          })
        )
      } finally {
        setOpenLoading(false)
        router.push("/cart")
      }
    }

    if (vnp_TransactionStatus !== undefined) {
      if (vnp_TransactionStatus === "00") {
        handleCreateOrder()
      } else {
        router.push("/cart")
      }
    }
  }, [vnp_TransactionStatus])

  const onSubmit = async data => {
    if (selectPayment !== null && selectAddress != null) {
      localStorage.setItem("addressId", selectAddress.addressId.toString())
      localStorage.setItem("paymentId", selectPayment.paymentId.toString())
    }
    let url = `#`
    if (selectPayment?.paymentId === 1) {
      url = createPaymentUrl(total, `http://localhost:3000/${router.asPath}`)
    } else {
      url = `${router.asPath}?vnp_TransactionStatus=00`
    }
    router.push(url)
  }
  return (
    <Layout1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CheckoutCartTable orderList={orderList} />
            <CheckoutAddress
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
              addressList={addressList}
              userBackend={user}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "1rem"
              }}
            >
              <CheckoutPayment
                selectPayment={selectPayment}
                setSelectPayment={setSelectPayment}
                paymentList={paymentList}
              />
              <CheckoutInfor
                total={total}
                selectAddress={selectAddress}
                selectPayment={selectPayment}
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout1>
  )
}

export default Order
