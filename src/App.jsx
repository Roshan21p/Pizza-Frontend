import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './Components/Loader';

// Lazy load components
const Home = React.lazy(() => import('./Pages/Home'));
const Signup = React.lazy(() => import('./Pages/Auth/Signup'));
const Login = React.lazy(() => import('./Pages/Auth/Login'));
const NotFound = React.lazy(() => import('./Pages/NotFound'));
const Denied = React.lazy(() => import('./Pages/Denied'));
const ProductDetails = React.lazy(() => import('./Pages/Products/ProductDetails'));
const CartDetails = React.lazy(() => import('./Pages/Cart/CartDetails'));
const Order = React.lazy(() => import('./Pages/Order/Order'));
const OrderSuccess = React.lazy(() => import('./Pages/Order/OrderSuccess'));
const RequireAuth = React.lazy(() => import('./Components/Auth/RequireAuth'));
const About = React.lazy(() => import('./Pages/About'));
const Services = React.lazy(() => import('./Pages/Services'));
const Menu = React.lazy(() => import('./Pages/Menu'));
const Contact = React.lazy(() => import('./Pages/Contact'));
const Profile = React.lazy(() => import('./Pages/User/Profile'));
const EditProfile = React.lazy(() => import('./Pages/User/EditProfile'));
const AddProduct = React.lazy(() => import('./Pages/Admin/AddProduct'));
const ForgotPassword = React.lazy(() => import('./Pages/Password/ForgotPassword'));
const ResetPasssword = React.lazy(() => import('./Pages/Password/ResetPassword'));
const Checkout = React.lazy(() => import('./Pages/Payment/Checkout'));
const PaymentVerification = React.lazy(() => import('./Pages/Payment/PaymentVerification'));
const OrderFailure = React.lazy(() => import('./Pages/Order/OrderFailure'));
const MyOrders = React.lazy(() => import('./Pages/Order/MyOrders'));
const OrderDetails = React.lazy(() => import('./Pages/Order/OrderDetails'));
const AdminDashboard = React.lazy(() => import('./Pages/Admin/AdminDashboard'));
const AllOrders = React.lazy(() => import('./Pages/Admin/AllOrders'));
const AllProducts = React.lazy(() => import('./Pages/Admin/AllProducts'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:resetToken" element={<ResetPasssword />} />

        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit" element={<AddProduct />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/all-products" element={<AllProducts />} />
          <Route path="/admin/all-orders" element={<AllOrders />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/me" element={<MyOrders />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-verification" element={<PaymentVerification />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
