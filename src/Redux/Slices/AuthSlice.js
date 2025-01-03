import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import toast from 'react-hot-toast';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || '',
  //data: JSON.parse(localStorage.getItem('data')) || {},
  data: localStorage.getItem('data') != 'undefined' ? JSON.parse(localStorage.getItem('data')) : {}
};

export const createAccount = createAsyncThunk('/auth/createAccount', async (data) => {
  try {
    const response = axiosInstance.post('/users', data);
    toast.promise(response, {
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      loading: 'Hold back tight, we are registering your id...',
      error: 'Ohh No!, Something went wrong. Please try again.'
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const login = createAsyncThunk('/auth/login', async (data) => {
  try {
    const response = axiosInstance.post('/auth/login', data);
    toast.promise(response, {
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },

      loading: 'Hold back tight, we are registering your id...',
      error: 'Ohh No!, Something went wrong. Please try again.'
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    const response = axiosInstance.post('/auth/logout');
    toast.promise(response, {
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      loading: 'Logging out...',
      error: 'Ohh No!, Something went wrong. Please try again.'
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const getUserData = createAsyncThunk('/user/details', async () => {
  try {
    const response = await axiosInstance.get('/users/getProfile');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message)
  }
})

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // reducer which will execute when the login thunk is fulfilled
        console.log(action);

        if (!action?.payload?.data?.data?.userData) return;
        state.isLoggedIn = action?.payload?.data?.success;
        state.role = action?.payload?.data?.data?.userRole;
        state.data = action?.payload?.data?.data?.userData;

        localStorage.setItem('isLoggedIn', action?.payload?.data?.success);
        localStorage.setItem('role', action?.payload?.data?.data?.userRole);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData));
      })
      .addCase(logout.fulfilled, (state) => {
        // reducer which will execute when the logout thunk is fulfilled
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('role', '');
        localStorage.setItem('data', JSON.stringify({}));

        state.isLoggedIn = false;
        state.role = '';
        state.data = {};
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log(action);
        

        if (!action?.payload?.data?.userData) return;
        state.isLoggedIn = action?.payload?.success;
        state.role = action?.payload?.data?.role;
        state.data = action?.payload?.data?.userData;

        localStorage.setItem('isLoggedIn', action?.payload?.success);
        localStorage.setItem('role', action?.payload?.data?.userData?.role);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data?.userData));
      })
  }
});

export default AuthSlice.reducer;
