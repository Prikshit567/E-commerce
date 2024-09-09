


import React, { Fragment, useEffect } from 'react';
import './Orders.css';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import LaunchIcon from '@mui/icons-material/Launch';
import { myOrders } from "../../Redux/slices/orderSlice";
import { Typography } from '@mui/material';

const Orders = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { orders, loading } = useSelector((state) => state.order);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      flex: 1,
      minWidth: 300
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 150,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      flex: 0.3,
      type: "number",
      minWidth: 150
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
      type: "number",
      minWidth: 270
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      type: "number",
      minWidth: 270,
      sortable: false,
      renderCell: (params) => {
        console.log("working")
        return (
          <Link to={`/order/${params.id}`}>
            
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
  orders.forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });

  console.log("Orders:", orders);
  console.log("Rows:", rows);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default Orders;
