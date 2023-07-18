import {
    Dialog,
    DialogContent,
    DialogTitle,
    OutlinedInput
  } from "@mui/material"
  import React, { useState } from "react"
  import AddHomeIcon from "@mui/icons-material/AddHome"
  import { setup } from "@/config/setup"
  import Address from "../auth/Address.js"
  import { StyledButton } from "../theme/button/StyledButton"
  import FlexBox from "../theme/flexbox/FlexBox"
  
  export default function AddressButton({ handleAddAddress }) {
    const [openPopup, setOpenPopup] = useState(false)
    const [address, setAddress] = useState("")
    const [street, setStreet] = useState("")
    const handleChange = value => {
      setStreet(value)
    }
    return (
      <>
        <Dialog
          open={openPopup}
          onClose={() => {
            setOpenPopup(false)
          }}
          sx={{
            maxWidth: "35rem",
            margin: "auto"
          }}
          fullWidth
        >
          <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          <DialogContent>
            <Address setAddress={setAddress} />
            <div style={{ marginTop: "1rem" }}></div>
            <label htmlFor="address">* Số nhà tên đường</label>
            <OutlinedInput
              placeholder="Địa chỉ"
              size="small"
              sx={{
                width: "100%",
                marginBottom: "1rem"
              }}
              onChange={e => {
                handleChange(e.target.value)
              }}
              endAdornment={<AddHomeIcon />}
            />
            <StyledButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                address.split(",").length > 2 && street !== "" ? false : true
              }
              sx={{
                backgroundColor: setup.inside
              }}
              onClick={() => {
                handleAddAddress({
                  address: `Địa chỉ: ${street}, ${address}`
                })
                setOpenPopup(false)
              }}
            >
              Submit
            </StyledButton>
          </DialogContent>
        </Dialog>
        <FlexBox justifyContent="flex-end">
          <StyledButton
            onClick={() => {
              setOpenPopup(true)
              setAddress("")
            }}
            variant="contained"
          >
            Thêm địa chỉ mới
          </StyledButton>
        </FlexBox>
      </>
    )
  }
  