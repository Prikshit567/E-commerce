import {createSlice} from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
    loading:false,
    error:null,
    order :{},
    orders :[],
    adminOrders:[], 
    isDeleted:false,
    isUpdated:false,
};

const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        newOrderRequest:(state,action)=>{
            state.loading = true
        },
        newOrderSuccess:(state,action)=>{
            state.loading = false;
            state.order = action.payload.order;

        },
        newOrderFail:(state,action)=>{
            state.loading = true;
            state.error = action.payload.error;
        },
        myOrdersRequest:(state,action)=>{
            state.loading = true
        },
        myOrdersSuccess:(state,action)=>{
            state.loading = false;
            state.orders = action.payload.orders;

        },
        myOrdersFail:(state,action)=>{
            state.loading = true;
            state.error = action.payload.error;
        },  
        orderDetailsRequest:(state ,action)=>{
            state.loading=true;
        },
        orderDetailsSuccess :(state ,action)=>{
            state.loading = false;
            state.order = action.payload;
        },
        orderDetailsFail:(state ,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        allOrderRequest:(state,action)=>{
            state.loading = true;
        },
        allOrderSuccess:(state,action)=>{
            state.loading = false;
            state.adminOrders = action.payload.adminOrders
        },
        allOrderFail:(state,action)=>{
            state.loading = true;
            state.error = action.payload.error
        },
        updateOrderRequest:(state,action)=>{
            state.loading = true;
        },
        updateOrderSuccess:(state,action)=>{
            state.loading = false;
            state.isUpdated = action.payload
        },
        updateOrderFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        updateOrderReset:(state, action)=>{
            state.isUpdated = false;
        },
        deleteOrderRequest:(state,action)=>{
            state.loading = true;
        },
        deleteOrderSuccess:(state,action)=>{
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteOrderFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        deleteOrderReset:(state,action)=>{
            state.isDeleted = false;
        },
        ClearError:(state,action)=>{
            state.error = null 
        },
    },
});

export const {newOrderRequest,
            newOrderSuccess,
            newOrderFail, 
            ClearError, 
            myOrdersFail, 
            myOrdersRequest, 
            myOrdersSuccess, 
            orderDetailsFail, 
            orderDetailsRequest, 
            orderDetailsSuccess,
            allOrderFail, 
            allOrderRequest,
            allOrderSuccess,
            updateOrderFail,
            updateOrderRequest,
            updateOrderSuccess,
            updateOrderReset,
            deleteOrderFail,
            deleteOrderRequest,
            deleteOrderReset,
            deleteOrderSuccess,
        } = orderSlice.actions;

export default orderSlice.reducer;


// Create Order

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(newOrderRequest());

        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config)
        console.log("data of createOrder",data)
        console.log("data of order",order)
        dispatch(newOrderSuccess(data))
    } catch (error) {
        dispatch(newOrderFail(error.response.data.message))
        console.log(error.response.data.message)
    }
}


// My Order

export const myOrders = () => async (dispatch) => {
    try {
        dispatch(myOrdersRequest());

        
        const { data } = await axios.get("/api/v1/orders/me" )

        dispatch(myOrdersSuccess(data))
    } catch (error) {
        dispatch(myOrdersFail(error.response.data.message))
    }
}

//  All Orders(Admin)

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(allOrderRequest());

        const { data } = await axios.get("/api/v1/admin/allorders" )

        dispatch(allOrderSuccess({adminOrders: data.adminOrders}))
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        dispatch(allOrderFail(errorMessage))
    }
};

// Update Order (Admin)

export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());

        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config)
        dispatch(updateOrderSuccess(data.success))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}


// Delete Order (Admin)

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch(deleteOrderSuccess(data.success))
        console.log()
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}


// Order Details

export const getOrderDetails = (id) => async(dispatch)=>{
    try {
        dispatch(orderDetailsRequest());

        const {data} = await axios.get(`/api/v1/order/${id}` )
        dispatch(orderDetailsSuccess(data.order))
        
    } catch (error) {
        dispatch(orderDetailsFail(error.response.data))
    }
}


// ClearErrors

export const ClearErrors = () => async (dispatch) => {
    dispatch(ClearError());  
  };

