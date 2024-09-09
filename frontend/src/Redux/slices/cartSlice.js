import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {}, // Ensure this is always an object
};


  const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                // state.cartItems = [...state.cartItems, item];
                state.cartItems.push(item);
            }
        },
        removeFromCart:(state, action) =>{
        state.cartItems = state.cartItems.filter((i)=> i.product !== action.payload)
        },
        saveShippingInfoAction:(state,action) =>{
            state.shippingInfo = action.payload
        }
    },
});

  export const {addToCart, removeFromCart, saveShippingInfoAction} = cartSlice.actions;
  export default cartSlice.reducer;

  // Add To Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) =>{
       
        const {data} = await axios.get(`/api/v1/product/${id}`, )
        console.log("data",data);

        dispatch(addToCart({
          product:data.product._id,
          name:data.product.name,
          price:data.product.price,
          image:data.product.images ? data.product.images[0].url : 'sed',
       

          stock:data.product.Stock,
          quantity,
        }));
        const cartItems = getState().cart.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Remove From Cart

export const removeItemFromCart = (id) => async(dispatch, getState) =>{
    dispatch(removeFromCart(id))
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Save Shipping Info


export const saveShippingInfo = (data) => async(dispatch) =>{
    dispatch(saveShippingInfoAction(data))
    
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}



  