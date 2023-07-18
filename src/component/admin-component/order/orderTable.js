import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  styled,
  Dialog,
  TablePagination
} from "@mui/material"
import React, { useState } from "react"
const StyledTableHead = styled(Typography)(() => ({
  fontWeight: 700
}))

export default function OrderAdminTable({ order }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledTableHead width={20}>Mã</StyledTableHead>
            </TableCell>
            <TableCell>
              <StyledTableHead width={200}>Sản phẩm</StyledTableHead>
            </TableCell>
            <TableCell width={250}>
              <StyledTableHead>Phương thức thanh toán</StyledTableHead>
            </TableCell>

            <TableCell width={180}>
              <StyledTableHead>Tên khách hàng</StyledTableHead>
            </TableCell>
            <TableCell width={120}>
              <StyledTableHead>Tổng giá</StyledTableHead>
            </TableCell>
            <TableCell width={200}>
              <StyledTableHead>Ngày thanh toán</StyledTableHead>
            </TableCell>
            <TableCell width={120}>
              <StyledTableHead>Cập nhật</StyledTableHead>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order !== null && order !== undefined ? (
            order
              .slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(row => (
                <TableRow key={row.orderId}>
                  <TableCell>{row.orderId}</TableCell>

                  <TableCell>
                    {row.productAndOrderItemList.map((item, key) => (
                      <Typography variant="subtitle2" key={key}>
                        {item.quantity} x {item.product.productName}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>{row.payment.paymentType}</TableCell>
                  <TableCell>{row.user.userName}</TableCell>
                  <TableCell>{row.totalPayment}</TableCell>
                  <TableCell>{row.paymentDate}</TableCell>
                </TableRow>
              ))
          ) : (
            <Dialog open={true}></Dialog>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={order !== undefined && order !== null ? order.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </TableContainer>
  )
}