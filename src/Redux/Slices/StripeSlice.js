import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
    sessionId: '',
    allPayments : {},
    monthlyPayments : {},
};

export const createCheckoutSession = createAsyncThunk('stripe/createCheckoutSession', async ({address, paymentMethod}) => {
    try {
        const response =  axiosInstance.post('/payments/create-checkout', {paymentMethod, address});
        toast.promise(response, {
              loading: 'Creating your payment session...',
              success: 'Payment session created successfully!'
        })
        
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
    }
});

export const verifyPayment = createAsyncThunk('stripe/verifyPayment', async ({session_id}) => {
    try {
        const response = await axiosInstance.post('/payments/verify-payment', {session_id});
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
    }
});

const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setAllPayments: (state, action) => {
            state.allPayments = action.payload;
        },
        setMonthlyPayments: (state, action) => {
            state.monthlyPayments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createCheckoutSession.fulfilled, (state, action) => {
            state.sessionId = action?.payload?.sessionId;
        });
    }
})

export const { setSessionId, setAllPayments, setMonthlyPayments } = stripeSlice.actions;
export default stripeSlice.reducer;