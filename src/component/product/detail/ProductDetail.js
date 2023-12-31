import React from "react"
import { setup } from "@/config/setup"
import { setOpen } from "@/feature/Alert"
import { useAppDispatch } from "@/feature/Hooks"
import StyledLoadingButton from "@/component/theme/button/StyledLoadingButton"
import { StyledTypography } from "@/component/theme/text/Typography"
import { UserContext } from "@/component/auth/AuthContext"
import { auth } from "@/config/firebase"
import { UseAddToCart } from "../../../../package/function/cart/use-add-cartItem"
const formatNumber = number => {
  return number.toLocaleString("en-US")
}
export default function ProductDetail({ product }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { cart } = React.useContext(UserContext)
  const dispatch = useAppDispatch()
  const handleAddtoCart = async () => {
    if (auth.currentUser === null) {
      dispatch(
        setOpen({
          open: true,
          message: "Hãy đăng nhập để tiếp tục mua sắm",
          severity: "error"
        })
      )
    } else {
      try {
        setIsLoading(true)

        const response = await UseAddToCart({
          productId: product?.productId,
          cartId: cart?.cart.cartId,
          auth: auth.currentUser?.uid
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
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <StyledTypography
        style={{
          fontSize: "2rem"
        }}
      >
        {product.productName}
      </StyledTypography>
      <div
        style={{
          margin: "1rem 0rem"
        }}
      >
        <StyledTypography
          variant="h6"
          sx={{
            color: "#e10404"
          }}
        >
          {formatNumber(product.price)} VND{" "}
        </StyledTypography>
        <StyledTypography
          variant="h6"
          sx={{
            color: product.quantity > 0 ? setup.success : setup.error
          }}
        >
          Số lượng: {product.quantity}
        </StyledTypography>
      </div>
      <StyledTypography variant="body1">
        Tình trạng: {product.status}
      </StyledTypography>
      <StyledTypography variant="body1">Thông tin: </StyledTypography>
      <StyledTypography variant="body1">{product.description}</StyledTypography>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center"
        }}
      >
        <StyledLoadingButton
          loading={isLoading}
          variant="contained"
          disabled={product.quantity > 0 ? false : true}
          onClick={() => handleAddtoCart()}
          sx={{
            "&:hover": {
              backgroundColor:
                product.quantity > 0
                  ? `${setup.success} !important`
                  : setup.error
            },
            backgroundColor: product.quantity > 0 ? setup.success : setup.error,
            color: "white"
          }}
        >
          {product.quantity > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
        </StyledLoadingButton>
      </div>
    </>
  )
}
