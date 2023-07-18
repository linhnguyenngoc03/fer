import {
  Button,
  CardMedia,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from "@mui/material"
import React, { useContext, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import ProductUploadForm from "@/component/admin-component/product/ProductUploadForm"
import { deleteProductApi } from "@/pages/api/ProductApi"
import { useAppDispatch } from "@/feature/Hooks"
import { setOpen } from "@/feature/Alert"
import ConfirmPopup from "@/component/theme/confirm/ConfirmPopup"
import { UserContext } from "@/component/auth/AuthContext"
import { StyledTypography } from "@/component/theme/text/Typography"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import ProductEditForm from "./ProductEditForm"

export default function ProductTable({ productList, categoryList }) {
  const router = useRouter()
  const data = router.query
  const filter = productList => {
    let productFilterList = productList
    if (data.searchValue !== undefined) {
      return productFilterList.filter(product => {
        return product.productName.indexOf(data.searchValue) !== -1
      })
    } else {
      return productList
    }
  }
  const [selectProducts, setSelectProducts] = useState([])
  const { setOpenLoading } = useContext(UserContext)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const dispatch = useAppDispatch()
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
  const { handleSubmit, register } = useForm()
  const onSubmit = data => {
    if (data.searchValue === "") {
      router.push("/admin/product")
    } else {
      router.push(`/admin/product?searchValue=${data.searchValue}`)
    }
  }
  const handleDelete = async () => {
    try {
      setOpenLoading(true)
      await deleteProductApi(selectProducts)
      dispatch(
        setOpen({
          open: true,
          message: "Delete success",
          severity: "success"
        })
      )
    } catch (error) {}
    setOpenLoading(false)
    setSelectProducts([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <TableContainer component={Paper}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <StyledTypography variant="h4">Product</StyledTypography>
        <form
          style={{
            display: "flex"
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            size="small"
            variant="outlined"
            color="secondary"
            {...register("searchValue", {
              required: false
            })}
          />
          <Button
            type="submit"
            sx={{
              display: "none"
            }}
          >
            search
          </Button>
          <div>
            <Button
              aria-label="delete"
              size="small"
              onClick={() => setOpenConfirmPopup(true)}
              disabled={selectProducts.length == 0}
            >
              <Typography color="error">
                {selectProducts.length > 0
                  ? `${selectProducts.length} selected`
                  : ""}
              </Typography>
              <DeleteIcon
                style={{
                  width: 30,
                  height: 30
                }}
                color="error"
              />
            </Button>
            <ProductUploadForm categoryList={categoryList} />
          </div>
        </form>
      </Toolbar>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ width: "150px", fontWeight: "700" }}>
              Name
            </TableCell>
            <TableCell sx={{ width: "100px", fontWeight: "700" }}>
              Price
            </TableCell>
            <TableCell sx={{ width: "50px", fontWeight: "700" }}>
              Quantity
            </TableCell>
            <TableCell sx={{ width: "100px", fontWeight: "700" }}>
              Category
            </TableCell>
            <TableCell sx={{ width: "600px", fontWeight: "700" }}>
              Description
            </TableCell>
            <TableCell sx={{ width: "100px", fontWeight: "700" }}>
              Status
            </TableCell>
            <TableCell sx={{ width: "100px", fontWeight: "700" }}>
              Image
            </TableCell>
            <TableCell align="right" sx={{ width: "50px", fontWeight: "700" }}>
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filter(productList)
            .slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(row => (
              <TableRow key={row.productId}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="error"
                    onChange={e => {
                      if (e.currentTarget.checked === true) {
                        setSelectProducts([...selectProducts, row.productId])
                      } else {
                        setSelectProducts(
                          selectProducts.filter(
                            productId => !(row.productId === productId)
                          )
                        )
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  {
                    categoryList.find(
                      category => category.categoryId === row.categoryId
                    ).categoryName
                  }
                </TableCell>
                <TableCell align="justify" size="small">
                  {row.description}
                </TableCell>
                <TableCell align="justify">{row.status}</TableCell>
                <TableCell>
                  {/* <Link href={"../assets/images/" + row.image} target="_blank">
                    Click
                  </Link> */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: "5rem",
                      height: "5rem"
                    }}
                    src={"../assets/images/" + row.image}
                  />
                </TableCell>
                <TableCell align="right">
                  <ProductEditForm product={row} categoryList={categoryList} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filter(productList).length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <ConfirmPopup
        openConfirmPopup={openConfirmPopup}
        setOpenConfirmPopup={setOpenConfirmPopup}
        func={handleDelete}
      />
    </TableContainer>
  )
}
