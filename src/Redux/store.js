import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReducer from './Slices/AuthSlice';
import ProductSliceReducer from './Slices/ProductSlice';
import CartSliceReducer from './Slices/CartSlice';
import OrderSliceReducer from './Slices/OrderSlice';
import StripeSliceReducer from './Slices/StripeSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    product: ProductSliceReducer,
    cart: CartSliceReducer,
    order: OrderSliceReducer,
    stripe: StripeSliceReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
