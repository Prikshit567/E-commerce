import React, { Fragment, useEffect, useState } from 'react'
// import { SpeedDial, SpeedDialAction } from "@mui/lab"
import { Backdrop } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {logoutUser} from "../../Redux/slices/userSlice"
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({user}) => {

  const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const orders =() =>{
        navigate('/orders')
      }
      const cart =() =>{
        navigate('/cart')
      }
      const account =() =>{
       
        navigate('/account')

      }
      const logout =() =>{
       dispatch(logoutUser());
       console.log("Logout Successfull")
        navigate('/login')
      }
      const dashboard =() =>{
        navigate('/admin/dashboard')
      }
      
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logout },
      ];
      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardCustomizeIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }


      
      
      
    
    const [open, setOpen] = useState()
  return (
  <Fragment>
    <Backdrop open={open} style={{zIndex:"10"}} />
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
    
        icon={
          <img
            className="speedDialIcon"
            src={user.profile.url ? user.profile.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
          {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
  </Fragment>
  )
}

export default UserOptions
