import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosinstance';

const initialState = {
  ordersData: null
};

export const getMyOrders = createAsyncThunk(
  '/order/getMyOrders',
  async (__, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get('/orders/me');
      toast.promise(response, {
        loading: 'Fetching your orders...',
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
      //toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  '/order/getOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get(`/orders/${orderId}`);
      toast.promise(response, {
        loading: 'Fetching your order details ...',
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
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  '/order/getAllOrders',
  async (__, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get('/orders');
      toast.promise(response, {
        loading: 'Fetching your orders...',
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
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  '/order/updateOrderStatus',
  async ({orderId, status}, { rejectWithValue }) => {
    try {
      const response = axiosInstance.put(`/orders/${orderId}/status`, {status});
      toast.promise(response, {
        loading: 'Updating your orders status...',
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
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      console.log('action', action);

      state.ordersData = action?.payload?.data?.data;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      console.log('action', action);

      state.ordersData = action?.payload?.data?.data;
    });
  }
});

export default OrderSlice.reducer;
