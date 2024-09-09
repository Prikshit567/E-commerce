import React, { Fragment } from 'react'
import { Navigate, Outlet,  } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

  
    const isAuthenticated = localStorage.getItem('isAuthenticated')
// console.log('isAuthenticated ===>',isAuthenticated)
    if (isAuthenticated === false) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" />;
      }
    
      return children ? children : <Outlet />;
    };
    
    export default ProtectedRoute;

