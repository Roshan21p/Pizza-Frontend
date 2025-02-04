import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import toast from 'react-hot-toast';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || '',
  //data: JSON.parse(localStorage.getItem('data')) || {},
  data: localStorage.getItem('data') != 'undefined' ? JSON.parse(localStorage.getItem('data')) : {}
};

export const createAccount = createAsyncThunk(
  '/auth/createAccount',
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post('/users', data);
      toast.promise(response, {
        loading: 'Hold back tight, we are registering your id...',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      const apiResponse = await response;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const login = createAsyncThunk('/auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = axiosInstance.post('/auth/login', data);
    toast.promise(response, {
      loading: 'Hold back tight, we are registering your id...',
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.message || error?.message;
      }
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const logout = createAsyncThunk('/auth/logout', async (__, { rejectWithValue }) => {
  try {
    const response = axiosInstance.post('/auth/logout');
    toast.promise(response, {
      loading: 'Logging out...',
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.message || error?.message;
      }
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateProfile = createAsyncThunk(
  '/user/update-profile',
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.put('/users/me', data);
      toast.promise(response, {
        loading: 'Hold back tight! We are updating your profile...',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      const apiResponse = await response;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getUserData = createAsyncThunk('/user/details', async (__, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/users/getProfile');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const forgotPassword = createAsyncThunk(
  '/auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post('/auth/forgot-password', { email });
      toast.promise(response, {
        loading: 'Hold back tight! We are verifying your email...',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      const apiResponse = await response;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  '/auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post(`/auth/reset-password/${data.resetToken}`, {
        password: data.password
      });
      toast.promise(response, {
        loading: 'Hold back tight! We are resetting the password...',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      const apiResponse = await response;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

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
        state.isLoggedIn = false;
        state.role = '';
        state.data = {};

        localStorage.clear();
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log('getuserData', action);

        if (!action?.payload?.data?.userData) return;
        state.isLoggedIn = action?.payload?.success;
        state.role = action?.payload?.data?.userData?.role;
        state.data = action?.payload?.data?.userData;

        localStorage.setItem('isLoggedIn', action?.payload?.success);
        localStorage.setItem('role', action?.payload?.data?.userData?.role);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data?.userData));
      });
  }
});

export default AuthSlice.reducer;
