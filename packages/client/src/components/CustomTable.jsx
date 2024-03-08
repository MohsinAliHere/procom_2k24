import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TablePagination,
  Stack,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { apiHandle } from "../config/apiHandle/apiHandle";
import { errorMsg } from "../utlis/common";

const CustomTable = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [row_data, setRow_data] = useState(rows)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const pay = async (params) => {
    try {
      const res = await apiHandle.put(
        `customer/accept-payment-action/${params}`
      );
      const transaction_id = res.data.data._id
      const new_data = row_data.map((elem)=>elem._id === transaction_id ? {...elem, status:res.data.data.status } : {...elem})
      setRow_data(new_data)

      console.log("success", new_data);
    } catch (error) {
      errorMsg(error?.message || "Something went wrong") 
    }
  };
  const reject = async (params) => {
    try {
      const res = await apiHandle.put(
        `/customer/reject-payment-action/${params}`
      );
      const transaction_id = res.data.data._id
      const new_data = row_data.map((elem)=>elem._id === transaction_id ? {...elem, status:res.data.data.status } : {...elem})
      setRow_data(new_data)
      console.log("success", new_data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ backgroundColor: "#F3F4F6", padding: "25px" }}
                    key={column.field}
                    align={column.align || "left"}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {row_data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.customerNumber}>
                    {columns.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell key={column.field}>
                          {column.field === "action" && row.status === 'Pending'   ? (
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="outlined"
                                onClick={() => reject(row._id)}
                                color="error"
                              >
                                Reject
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => pay(row._id)}
                                color="primary"
                              >
                                Pay
                              </Button>
                            </Stack>
                          ) : column.field === "dots" ? (
                            <IconButton aria-label="">
                              <BsThreeDots size={30} />
                            </IconButton>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CustomTable;
