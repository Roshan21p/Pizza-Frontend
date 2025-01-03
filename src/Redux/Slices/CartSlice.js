import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import toast from 'react-hot-toast';

const initialState = {
  cartsData: null
};

export const addProductToCart = createAsyncThunk('/cart/addProduct', async (productId) => {
  try {
    const response = axiosInstance.post(`/carts/add/${productId}`);
    toast.promise(response, {
      loading: 'Adding product to cart',
      success: 'Product added successfully',
      error: 'Something went wrong cannot add product to cart'
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});
export const removeProductFromCart = createAsyncThunk('/cart/removeProduct', async (productId) => {
  try {
    const response = axiosInstance.post(`/carts/remove/${productId}`);
    toast.promise(response, {
      loading: 'Removing product from cart',
      error: 'Something went wrong cannot remove product from cart',
      success: 'Product removed successfully'
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});
export const getCartDetails = createAsyncThunk('/cart/getDetails', async () => {
  try {
    const response = axiosInstance.get(`/carts`);
    toast.promise(response, {
      loading: 'Fetching cart details',
      error: 'Something went wrong cannot fetch cart',
      success: 'Cart fetched successfully'
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
    toast.error(error?.response?.data?.message || error?.message);
  }
});
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      state.cartsData = action?.payload?.data?.data;
    });
  }
});

export default cartSlice.reducer;
