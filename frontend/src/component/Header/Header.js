import React from 'react'
import { NavLink } from "react-router-dom"
import "./Header.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from '../Product/Search'
import UserOptions from './UserOptions'
import { useSelector } from 'react-redux'



const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  
  return (
    <div>
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink  to="/" className="nav-logo">
            Shopping-Hub
            <i className="fa fa-cart-shopping"></i>
           
          </NavLink>
         
          <li>
              <Search/>
            </li>
           
            
          <ul className={click ? "nav-menu active" : "nav-menu"}>
         
            <li className="nav-item">
              <NavLink
                
                to="/"
                // activeClassName="active"
                className="nav-NavLinks"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                to="/products"
                // activeClassName="active"
                className="nav-NavLinks"
                onClick={click ? handleClick : null}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                to="/"
                // activeClassName="active"
                className="nav-NavLinks"
                onClick={click ? handleClick : null}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                to="/"
                // activeClassName="active"
                className="nav-NavLinks"
               onClick={click ? handleClick : null}
              >
                About 
              </NavLink>
            </li>
            <li>
            {isAuthenticated && <UserOptions user={user} />}
            </li>
           
           
          </ul>
          <div className="nav-icon" onClick={handleClick}>
          <i className={click ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>
  );
}

export default Header;


