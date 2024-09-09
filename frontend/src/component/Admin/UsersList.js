import React, { Fragment, useEffect } from 'react';
import './ProductList.css'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, deleteUser, deleteUserReset, ClearErrors } from '../../Redux/slices/userSlice';




const UsersList = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const {users, isDeleted, error:deleteErrors} = useSelector((state)=>state.user)

    const deleteUserHandler = (id) =>{
      
      dispatch(deleteUser(id))
      console.log("hhhhh",id)
    }

    useEffect(()=>{
     
      if(deleteErrors){
        console.log(deleteErrors);
        dispatch(ClearErrors())
      };
      if(isDeleted){
        console.log("Product Deleted SuccessFully");
        dispatch(deleteUserReset());
        navigate("/admin/users");
      }
        dispatch(allUsers())
    },[dispatch, deleteErrors, isDeleted,   navigate ])  
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName: (params) => {
            return  params.row.role === "admin" ? "greenColor" : "redColor";
          },
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
                  <Link to={`/admin/user/${params.row.id}`}>
                    <EditIcon />
                  </Link>
      
                  <Button onClick={()=>deleteUserHandler(params.row.id)}>
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },
    ]
   const rows = []
  //  users && users.forEach((item)=>{
  //   rows.push({
  //       id:item._id,
  //       email:item.email,
  //       role:item.role,
  //       name:item.name
  //   })
  //  })
  if (Array.isArray(users)) {
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name,
      });
    });
  } else {
    console.error("Expected users to be an array, but got:", users);
  }

//    console.log("users ---->",users)


   
  return (
   <Fragment>
    <div className='dashboard'>
    <Sidebar/>
    <div className='productListContainer'>
        <h1 id='productListHeading'> All  Users </h1>
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

export default UsersList
