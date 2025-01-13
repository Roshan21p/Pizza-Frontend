import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import NotFound from './Pages/NotFound';
import Denied from './Pages/Denied';
import ProductDetails from './Pages/Products/ProductDetails';
import CartDetails from './Pages/Cart/CartDetails';
import Order from './Pages/Order/Order';
import OrderSuccess from './Pages/Order/OrderSuccess';
import RequireAuth from './Components/Auth/RequireAuth';
import About from './Pages/About';
import Services from './Pages/Services';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import AddProduct from './Pages/Admin/AddProduct';
import ForgotPassword from './Pages/Password/ForgotPassword';
import ResetPasssword from './Pages/Password/ResetPassword';
import Checkout from './Pages/Payment/Checkout';
import PaymentVerification from './Pages/Payment/PaymentVerification';
import OrderFailure from './Pages/Order/OrderFailure';
import MyOrders from './Pages/Order/MyOrders';

function App() {
  return (
    <>
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
        </Route>

        <Route element={<RequireAuth  allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditProfile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/me" element={<MyOrders />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-verification" element={<PaymentVerification />} />

        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
