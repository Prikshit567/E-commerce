import React, { Fragment, useEffect, useState } from 'react'
import MailOutlineIcon  from '@mui/icons-material/MailOutline';
import PersonIcon  from '@mui/icons-material/Person';
import VerifiedUserIcon  from '@mui/icons-material/VerifiedUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  singleUserDetails, updateUserReset, updateUserRole } from '../../Redux/slices/userSlice';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { Button } from '@mui/material';


const UpdateUser = () => {

    const { id: userId } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [role , setRole] = useState("");

    const {loading, isUpdated, selectedUser: user} = useSelector((state)=>state.user)
    
    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
      
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("role", role);
      
        console.log("Submitting form with data:", {
          name,
          email,
          role
        });
      
        // dispatch(updateUserRole(userId, myForm));
        dispatch(updateUserRole(userId, myForm)).then(() => {
            // Fetch the updated user details
            dispatch(singleUserDetails(userId));
          });
      }

      
    useEffect(()=>{
        if(user && user._id !== userId){
            dispatch(singleUserDetails(userId))
            console.log("in if statement")
            console.log("user", user)
            console.log("userId",userId)
        }
        else if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            console.log("in else statement")
        }
        if(isUpdated){
            console.log("User Updated SuccessFully");
            navigate("/admin/users");
            dispatch(updateUserReset())
        }
    },[dispatch, navigate, isUpdated, userId, user])

    
   
    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <PersonIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineIcon />
                            <input
                                type="Email"
                                placeholder="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                
                <div>
                    <VerifiedUserIcon />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                </div>

                <Button 
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ?true : false || role === "" ? true : false}
                >
                    Update
                </Button>

            </form>
        </div>
      </div >
    </Fragment >
  );
};


export default UpdateUser
