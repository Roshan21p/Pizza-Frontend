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
import AddProduct from './Pages/Admin/AddProduct';
import About from './Pages/About';
import Services from './Pages/Services';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />

        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />

        <Route element={<RequireAuth />}>
          <Route path="/order" element={<Order />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/cart" element={<CartDetails />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
