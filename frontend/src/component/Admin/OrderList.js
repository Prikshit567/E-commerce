import React, { Fragment, useEffect } from 'react';
import './OrderList.css'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { ClearErrors, deleteOrder, deleteOrderReset } from '../../Redux/slices/orderSlice';
import {getAllOrders} from '../../Redux/slices/orderSlice';


const OrderList = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {adminOrders, isDeleted, error:deleteErrors} = useSelector((state)=>state.order)

    const deleteOrderHandler = (id) =>{
      
      dispatch(deleteOrder(id))
      console.log("hhhhh",id)
    }

    useEffect(()=>{
     
      if(deleteErrors){
        console.log(deleteErrors);
        dispatch(ClearErrors())
      };
      if(isDeleted){
        console.log("Order Deleted SuccessFully");
        console.log("Product Deleted:", isDeleted);
        dispatch(deleteOrderReset());
        dispatch(getAllOrders())
        navigate("/admin/allorders");
      }else{
        dispatch(getAllOrders())
    }
    },[dispatch, navigate, deleteErrors, isDeleted ])  
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
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
            renderCell: (params) => {
              return (
                <Fragment>
                  {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}> */}
                  <Link to={`/admin/order/${params.row.id}`}>
                    <EditIcon />
                  </Link>
      
                  <Button onClick={()=>deleteOrderHandler(params.row.id)}>
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },
    ]
   const rows = []


   adminOrders && adminOrders.forEach((item)=>{
    rows.push({
        id:item._id,
        itemsQty:item.orderItems.length,
        amount:item.totalPrice,
        status:item.orderStatus
    })
   })


   
  return (
   <Fragment>
    <div className='dashboard'>
    <Sidebar/>
    <div className='orderListContainer'>
        <h1 id='orderListHeading'> All  orders </h1>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orderListTable"
            autoHeight
          />
    </div>
    </div>
   </Fragment>
  )
}

export default OrderList
