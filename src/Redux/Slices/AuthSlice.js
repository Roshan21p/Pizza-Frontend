import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || 'false',
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {},
};

export const createAccount = createAsyncThunk('/auth/createAccount', async (data) => {
    console.log("Incoming data to the thunk", data);
     try {
        const response = axiosInstance.post('/users', data);
       toast.promise(response, {
            success: (reslovedPromise) => {
                return reslovedPromise?.data?.mesaage;
            },
            loading: 'Hold back tight, we are registering your id...',
            error: 'Ohh No!, Something went wrong. Please try again.',
       });
       const apiResponse = await response;
       console.log("Api response",apiResponse);
       return apiResponse;  
     } catch (error) {
        console.log(error);
     }
});

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default AuthSlice.reducer;