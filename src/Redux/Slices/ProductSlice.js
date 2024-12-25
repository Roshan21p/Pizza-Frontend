import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import toast from 'react-hot-toast';

const initialState = {
  productsData: [] // Array of products
};

export const getAllProducts = createAsyncThunk('/products/getAll', async () => {
  try {
    const products = axiosInstance.get('/products');
    toast.promise(products, {
      loading: 'Loading all the products',
      error: 'Something went wrong cannot load products',
      success: 'Products loaded successfully'
    });
    const apiResponse = await products;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const getProductDetails = createAsyncThunk('/products/getDetails', async (id) => {
  try {
    const product = axiosInstance.get(`/products/${id}`);
    toast.promise(product, {
      loading: 'Loading the product',
      error: 'Something went wrong cannot load product',
      success: 'Product loaded successfully'
    });
    const apiResponse = await product;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const addProduct = createAsyncThunk('/products/createProduct', async (data) => {
  try {
    const response = axiosInstance.post('/products', data);
    toast.promise(response, {
      loading: 'Hold back tight, we are registering your products...',
      error: 'Ohh No!, Something went wrong. Please try again. ',
      success: 'Successfully created the Product'
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.productsData = action?.payload?.data?.data;
    });
  }
});

export default productSlice.reducer;
