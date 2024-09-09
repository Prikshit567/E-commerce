import React, { Fragment, useEffect } from 'react';
import './ProductList.css'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, deleteProductReset, getAllProductsAdmin } from '../../Redux/slices/productSlice';
import { ClearErrors } from '../../Redux/slices/orderSlice';




const ProductList = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {adminProducts, isDeleted, error:deleteErrors} = useSelector((state)=>state.products)

    const deleteProductHandler = (id) =>{
      
      dispatch(deleteProduct(id))
      console.log("hhhhh",id)
    }

    useEffect(()=>{
     
      if(deleteErrors){
        alert(deleteErrors);
        dispatch(ClearErrors())
      };
      if(isDeleted){
        console.log("Product Deleted SuccessFully");
        dispatch(deleteProductReset());
        navigate("/admin/dashboard");
      }
        dispatch(getAllProductsAdmin())
        console.log(adminProducts)
    },[dispatch, deleteErrors, isDeleted, navigate ])  
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
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
                  <Link to={`/admin/product/${params.row.id}`}>
                    <EditIcon />
                  </Link>
      
                  <Button onClick={()=>deleteProductHandler(params.row.id)}>
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },
    ]
   const rows = []


   adminProducts && adminProducts.forEach((item)=>{
    rows.push({
        id:item._id,
        stock:item.Stock,
        price:item.price,
        name:item.name
    })
   })


   
  return (
   <Fragment>
    <div className='dashboard'>
    <Sidebar/>
    <div className='productListContainer'>
        <h1 id='productListHeading'> All  Products </h1>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
    </div>
    </div>
   </Fragment>
  )
}

export default ProductList
