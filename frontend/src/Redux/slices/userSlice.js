import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: true,
    error: null,
    isAuthenticated : false,
    // isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    user :null,
    selectedUser:null,
    users: [],
    isUpdated: false,
    success:false,
    isDeleted:false,
}

const userSlice =  createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRequest:(state, action)=>{
            state.loading = true;
            state.isAuthenticated = false
        },
        loginSuccess : (state, action) =>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('isAuthenticated', 'true');
        },
        loginFail :(state, action) =>{
            state.loading = true;
            state.isAuthenticated = false;
            state.error = action.payload.error;
            localStorage.removeItem('isAuthenticated');
        },
        ClearError:(state,action)=>{
            state.error = null 
        },
        registerRequest:(state, action)=>{
            state.loading = true;
            state.isAuthenticated = false
            
        },
        registerSuccess:(state, action) =>{
            state.loading=false;
            state.isAuthenticated = true;
            state.user=action.payload.user
        },
        registerFail:(state, action) =>{
            state.loading = true;
            state.error = action.payload.error;
        },
        loadUserRequest:(state, action)=>{
            state.loading = true;
            state.isAuthenticated = false
            
        },
        loadUserSuccess:(state, action) =>{
            state.loading=false;
            state.isAuthenticated = true;
            state.user=action.payload.user
        },
        loadUserFail:(state, action) =>{
            state.loading = true;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload.error;
        },
        logoutSuccess:(state,action)=>{
                state.loading = false;
                state.isAuthenticated= false;
                state.user = null;
                localStorage.removeItem('isAuthenticated');
        },
        logoutFail:(state, action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        allUsersRequest:(state,action) =>{
            state.loading = true;
        },
        allUsersSuccess:(state,action)=>{
            state.loading = false;  
            state.users = action.payload;
        },
        allUsersFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        getUserDetailsRequest:(state,action)=>{
            state.loading = true;
        },
        getUserDetailsSuccess:(state,action)=>{
            state.loading = false;
            state.selectedUser = action.payload;
        },
        getUserDetailsFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        updateUserRequest:(state,action)=>{
            state.loading = true;
        },
        updateUserSuccess:(state,action)=>{
            state.loading = false;
            // state.isUpdated = action.payload;
            state.isUpdated = true;
        },
        updateUserFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        updateUserReset:(state,action)=>{
            state.isUpdated = false;
        },
        deleteUserRequest:(state,action)=>{
            state.loading = true;
        },
        deleteUserSuccess:(state,action)=>{
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        deleteUserFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        deleteUserReset:(state,action)=>{
            state.isDeleted = false;
        },
    },
});

export const { loginRequest,
    loginSuccess,
    loginFail,
    ClearError, 
    registerRequest, 
    registerSuccess, 
    registerFail, 
    loadUserFail, 
    loadUserRequest, 
    loadUserSuccess,
    logoutSuccess, 
    logoutFail,
    getUserDetailsFail,
    getUserDetailsRequest,
    getUserDetailsSuccess,
    allUsersFail,
    allUsersSuccess,
    allUsersRequest,
    updateUserFail,
    updateUserRequest,
    updateUserReset,
    updateUserSuccess,
    deleteUserFail,
    deleteUserRequest,
    deleteUserReset,
    deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;


// Login
export const loginUser = (email, password) => async (dispatch) =>{
    try {
        dispatch(loginRequest());
        const config = {headers:{"Content-type":"application/json"}}
        const {data} = await axios.post(`/api/v1/login`, {email, password}, config )
        console.log("data",data);

        dispatch(loginSuccess({
            // user : data.user
            user : data.user
            
        }));
        console.log("data",data);
    } catch (error) {
            dispatch(loginFail(error.response.data.message));
    }
}

// Register
export const registerUser = (userData) =>async(dispatch) =>{
    try {
        dispatch(registerRequest());

        const config = {
            headers:{"Content-type":"multipart/form-data"}
        }
        const {data} = await axios.post(`/api/v1/register`, userData, config )

        dispatch(registerSuccess({
            user : data.user
        }));
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

// load user

export const loadUser = () => async (dispatch) =>{
    try {
        dispatch(loadUserRequest());
      
        const {data} = await axios.get(`/api/v1/me` )
       
       dispatch(loadUserSuccess({
            // user : data.user
            user : data.user
            
        }));
    } catch (error) {
            dispatch(loadUserFail(error.response.data.message));
    }
}

// LogOut User

export const logoutUser = () =>async(dispatch) =>{
    try {
      await axios.get(`/api/v1/logout`)
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
    }
}



// Admin Functions 

// Get All Users (Admin)

export const allUsers = () => async (dispatch) =>{

    try {
        dispatch(allUsersRequest());
      
        const {data} = await axios.get(`/api/v1/admin/allUsers` )   
        dispatch(allUsersSuccess(data.users));
        // console.log("data",data.users);
    } catch (error) {
            dispatch(allUsersFail(error.response.data.message));
    }
};


// Get Single User Details (Admin)

export const singleUserDetails = (id) => async (dispatch) =>{

    try {
        dispatch(getUserDetailsRequest());
      
        const {data} = await axios.get(`/api/v1/admin/user/${id}` )

        dispatch(getUserDetailsSuccess(data.user));
        } catch (error) {
            dispatch(getUserDetailsFail(error.response.data.message));
    }
};


// Update User (Admin)

export const updateUserRole = (id, formData) => async (dispatch) =>{
   try {
    dispatch(updateUserRequest());

    const config = {
        headers: { "Content-type": "multipart/form-data" }
    }

    const {data} = await axios.put(`/api/v1/admin/user/${id}`, formData , config)
    dispatch(updateUserSuccess(data.success))
    console.log("helllllooooooooo++++++++",data.success)
   } catch (error) {
    dispatch(updateUserFail(error.response.data.message))
   }
}


// Delete User (Admin)


export const deleteUser = (id) => async (dispatch) =>{
    try {
     dispatch(deleteUserRequest());
 
     const {data} = await axios.delete(`/api/v1/admin/user/${id}`)
     dispatch(deleteUserSuccess(data.success))
    } catch (error) {
     dispatch(deleteUserFail(error.response.data.message))
    }
 }

 // ClearErrors

export const ClearErrors = () => async (dispatch) => {
    dispatch(ClearError());  
  };

