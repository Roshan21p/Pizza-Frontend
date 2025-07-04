import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosinstance';

const initialState = {
  sessionId: '',
  monthlyPayments: [],
  totalAmount: 0
};

export const createCheckoutSession = createAsyncThunk(
  'stripe/createCheckoutSession',
  async ({ address, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post('/payments/create-checkout', { paymentMethod, address });
      toast.promise(response, {
        loading: 'Creating your payment session id...',
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error) => {
          return error?.response?.data?.message || error?.message;
        }
      });
      return (await response).data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'stripe/verifyPayment',
  async ({ session_id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/payments/verify-payment', { session_id });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchAllPayments = createAsyncThunk(
  'stripe/fetchAllPayments',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get(
        `payments/all-payments?startDate=${startDate}&endDate=${endDate}`
      );
      toast.promise(response, {
        loading: 'Fetching all payments...',
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

const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    // setSessionId: (state, action) => {
    //     state.sessionId = action.payload;
    // },
    // setAllPayments: (state, action) => {
    //     state.allPayments = action.payload;
    // },
    // setMonthlyPayments: (state, action) => {
    //     state.monthlyPayments = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createCheckoutSession.fulfilled, (state, action) => {
      state.sessionId = action?.payload?.sessionId;
    });
    builder.addCase(fetchAllPayments.fulfilled, (state, action) => {
      (state.monthlyPayments = action?.payload?.data?.data?.monthlyPayments),
        (state.totalAmount = action?.payload?.data?.data?.totalAmount);
    });
  }
});

export const { setSessionId, setAllPayments, setMonthlyPayments } = stripeSlice.actions;
export default stripeSlice.reducer;
