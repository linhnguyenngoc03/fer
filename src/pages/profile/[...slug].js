import {
  Paper,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  styled,
  Dialog
} from "@mui/material"
import React, { useContext, useState } from "react"
import ClearIcon from "@mui/icons-material/Clear"
import { useAppDispatch } from "@/feature/Hooks"
import Layout2 from "@/component/theme/layout/Layout2"
import { UseLogin } from "../../../package/function/auth/use-login"
import { UseGetAddressUserUidHook } from "../../../package/function/address/use-get-user-hook"
import AddressButton from "@/component/address/AddressButton"
import { setOpen } from "@/feature/Alert"
import { UseAddNewAddress } from "../../../package/function/address/use-add"
import { UserContext } from "@/component/auth/AuthContext"
import { UseDeleteAddress } from "../../../package/function/address/use-delete"
import { auth } from "@/config/firebase"
import ConfirmPopup from "@/component/theme/confirm/ConfirmPopup"

export const getServerSideProps = async ({ params }) => {
  const slug = params?.slug
  if (slug !== undefined) {
    const response = await UseLogin({ userUid: slug[0] })
    return {
      props: {
        user: response.data
      }
    }
  }
  return {
    props: {
      user: {}
    }
  }
}

const StyledTypography = styled(Typography)({
  marginBottom: "1rem",
  fontWeight: 600
})

export default function Profile({ user }) {
  const { data, isLoading, error, mutate } = UseGetAddressUserUidHook({
    userUid: auth.currentUser?.uid
  })
  const dispatch = useAppDispatch()
  const { setOpenLoading } = useContext(UserContext)
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
  const handleAddAddress = async ({ address }) => {
    try {
      setOpenLoading(true)
      const response = await UseAddNewAddress({
        address,
        userId: user.userId
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
      await mutate()
      setOpenLoading(false)
    }
  }
  const handleDeleteAddress = async ({ addressId }) => {
    try {
      setOpenLoading(true)
      const response = await UseDeleteAddress({
        addressId
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
      await mutate()
      setOpenLoading(false)
    }
  }
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState([])
  const [phoneNumber, setPhoneNumber] = useState([])

  return (
    <Layout2>
      <Paper
        sx={{
          padding: "1rem"
        }}
      >
        <div
          style={{
            margin: "1rem",
            display: "flex",
            marginBottom: "2rem"
          }}
        >
          <Avatar
            alt=""
            src=""
            sx={{
              marginRight: "2rem",
              width: 105,
              height: 105
            }}
          />
          <div>
            {user !== undefined ? (
              <>
                <StyledTypography>Name: </StyledTypography>
                <StyledTypography>Email: {user.email}</StyledTypography>
                <StyledTypography>Phone: {user.phoneNumber}</StyledTypography>
              </>
            ) : null}
          </div>
        </div>
        <AddressButton handleAddAddress={handleAddAddress} />

        {!isLoading && data?.data !== null ? (
          data?.data.map((userAddress, key) => (
            <>
              <TextField
                key={key}
                value={userAddress.address}
                fullWidth
                label={`Address ${key + 1}`}
                disabled
                sx={{
                  marginTop: "1rem"
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => {
                        setOpenConfirmPopup(true)
                      }}
                    >
                      <ClearIcon
                        color="error"
                        sx={{
                          cursor: "pointer"
                        }}
                      />
                    </InputAdornment>
                  )
                }}
              />
              <ConfirmPopup
                openConfirmPopup={openConfirmPopup}
                setOpenConfirmPopup={setOpenConfirmPopup}
                func={handleDeleteAddress}
                addressId={userAddress.addressId}
                key={key}
              />
            </>
          ))
        ) : (
          <Dialog open={true} />
        )}
      </Paper>
    </Layout2>
  )
}
