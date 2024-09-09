import React, { Fragment, useEffect, useState } from 'react';
import './Cart.css'
import CartItemCart from './CartItemCart';
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemFromCart } from '../../Redux/slices/cartSlice';
import { Typography } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [grossTotal , setGrossTotal] = useState(0);

   
    const handleIncrement = (id, quantity, stock) => {
        const newQty = quantity + 1;
        console.log("stock", stock)
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const handleDecrement = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) =>{
        dispatch(removeItemFromCart(id))
    } 




    const { cartItems } = useSelector((state) => state.cart)
    console.log("Items", cartItems)

    
    useEffect(() => {
        calculateGrossTotal();
      }, [cartItems]);


    const calculateGrossTotal = () =>{
        let total = 0;
        cartItems.forEach(item => {
          total += item.price * item.quantity;
        });
        setGrossTotal(total);
        console.log(total)
    };
    const checkOutHandler = () =>{
        navigate("/login?redirect=/shipping")
    }

    return (
       
            <Fragment>
                {cartItems.length === 0 ? (<div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>) :
         ( <Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                {/* {cartItems && cartItems.map((item)=>{ */}
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div className="cartContainer" key={item.product}>
                            <CartItemCart item={item} deleteCartItems={deleteCartItems} />
                            <div className="cartInput">
                                <button
                                    onClick={() => handleDecrement(item.product, item.quantity, item.stock)}
                                >
                                    -
                                </button>
                                <input type="number" value={item.quantity} readOnly />
                                <button
                                    onClick={() => handleIncrement(item.product, item.quantity, item.stock)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="cartSubtotal">{`₹${item.price * item.quantity
                                }`}</p>
                        </div>
                        //  })}
                    ))
                ) : (
                    <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
                )}
                     <div className="cartGrossProfit">
                     <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${grossTotal}`}</p>
              </div>
              <div></div>
               
                    <div className="checkOutBtn">
                        <button onClick={checkOutHandler} >Check Out</button>
                    </div>
                </div>
                 
            </div>
        </Fragment>
) }
            </Fragment>
    )
}

export default Cart
