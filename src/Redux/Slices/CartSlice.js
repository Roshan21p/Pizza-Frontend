import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import toast from 'react-hot-toast';

const initialState = {
  cartsData: null,
  fetched: false
};

export const addProductToCart = createAsyncThunk(
  '/cart/addProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post(`/carts/add/${productId}`);
      toast.promise(response, {
        loading: 'Adding product to cart',
        success: 'Product added successfully',
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
export const removeProductFromCart = createAsyncThunk(
  '/cart/removeProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post(`/carts/remove/${productId}`);
      toast.promise(response, {
        loading: 'Removing product from cart',
        success: 'Product removed successfully',
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
export const getCartDetails = createAsyncThunk(
  '/cart/getDetails',
  async (__, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get(`/carts`);
      toast.promise(response, {
        loading: 'Fetching cart details',
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
      console.log(error.response);
      if (error?.response?.status === 401) {
        toast.error('Please login to view cart');
        return {
          isUnauthorized: true
        };
      }
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const removeAllProductFromCart = createAsyncThunk(
  '/cart/clearCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = axiosInstance.delete(`/carts/item/${itemId}`);
      toast.promise(response, {
        loading: 'Removing item from cart',
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      state.cartsData = action?.payload?.data?.data;
      state.fetched = true;
    });
  }
});

export default cartSlice.reducer;
