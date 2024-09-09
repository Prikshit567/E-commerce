import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    loading: true,
    error: null,
    isUpdated: false,
    success:false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfileRequest: (state, action) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.isUpdated;
        },
        updateProfileFail: (state, action) => {
            state.loading = true;
            state.error = action.payload.error
        },
        updateProfileReset: (state, action) => {
            state.isUpdated = false
        },
        updatePasswordRequest: (state, action) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.isUpdated;
        },
        updatePasswordFail: (state, action) => {
            state.loading = true;
        }, updatePasswordReset: (state, action) => {
            state.isUpdated = false
        },

        forgetPasswordRequest: (state, action) => {
            state.loading = true;
        },
        forgetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.Message = action.payload.Message
        },
        forgetPasswordFail: (state, action) => {
            state.loading = true;
        },
        resetPasswordRequest: (state, action) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        },
        resetPasswordFail: (state, action) => {
            state.error = action.payload.error
        },
        
    },
});


export const { updateProfileRequest, updateProfileSuccess, updateProfileFail, updateProfileReset, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordReset, forgetPasswordRequest, forgetPasswordSuccess, forgetPasswordFail, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess } = profileSlice.actions;

export default profileSlice.reducer;

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const config = {
            headers: { "Content-type": "multipart/form-data" }
        }

        const { data } = await axios.put(`/api/v1/profile/update`, userData, config)

        console.log(data)
        dispatch(updateProfileSuccess({
            isUpdated: data.success
        }));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}


// Update Password

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());

        const config = {
            headers: { "Content-type": "application/json" }
        }

        const { data } = await axios.put(`/api/v1/password/update`, passwords, config)

        console.log(data)
        dispatch(updatePasswordSuccess({
            isUpdated: data.success
        }));
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
}


// Forget Password

export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgetPasswordRequest());

        const config = {
            headers: { "Content-type": "application/json" }
        }

        const { data } = await axios.post(`/api/v1/password/reset`, email, config)

        console.log(data)
        dispatch(forgetPasswordSuccess({
            // isUpdated:data.success
            user: data.user

        }));
    } catch (error) {
        dispatch(forgetPasswordFail(error.response.data.message))
    }
}


// Forget Password

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());

        const config = {
            headers: { "Content-type": "application/json" }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        console.log(data)
        dispatch(resetPasswordSuccess({
            isUpdated:data.success
        }));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}
