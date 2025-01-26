import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosinstance';
import toast from 'react-hot-toast';

const initialState = {
  productsData: [] // Array of products
};

export const getAllProducts = createAsyncThunk(
  '/products/getAll',
  async (__, { rejectWithValue }) => {
    try {
      const products = axiosInstance.get('/products');
      toast.promise(products, {
        loading: 'Loading all the products',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      const apiResponse = await products;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  '/products/getDetails',
  async (id, { rejectWithValue }) => {
    try {
      const product = axiosInstance.get(`/products/${id}`);
      toast.promise(product, {
        loading: 'Loading the product',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      const apiResponse = await product;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  '/products/createProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post('/products', data);
      toast.promise(response, {
        loading: 'Hold back tight, we are registering your product...',
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

export const updateProduct = createAsyncThunk(
  '/product/updateProduct',
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const response = axiosInstance.put(`/products/${productId}`, formData);
      toast.promise(response, {
        loading: 'Updating the product...',
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

export const deleteProduct = createAsyncThunk(
  '/product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = axiosInstance.delete(`/products/${productId}`);
      toast.promise(response, {
        loading: 'Deleting the product...',
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
