import { useDispatch, useSelector } from 'react-redux';
import Pizzalogo from '../assets/Images/pizza1.png';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../assets/Images/cart.svg';
import { getCartDetails } from '../Redux/Slices/CartSlice';
import { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { logout } from '../Redux/Slices/AuthSlice';

function Layout({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { cartsData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function handleLogout(e) {
    e.preventDefault();
    await dispatch(logout());
    navigate('/');
  }

  async function fetchCartDetails() {    
    const response = await dispatch(getCartDetails());
    if (response?.payload?.isUnauthorized) {
      dispatch(logout());
      navigate('/');
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isLoggedIn) fetchCartDetails();
  }, []);

  return (
    <div>
      <nav className="text-[#6B7280] font-mono border-none sm:h-12 shadow-md w-full px-4">
        <div className="flex items-center  sm:justify-between justify-between mt-4">
          {/* Logo */}
          <div className="flex items-center   cursor-pointer" onClick={() => navigate('/')}>
            <p className="mr-2 mb-2 sm:pl-[50px] md:pl-[70px]  text-[#FF9110] text-2xl sm:text-3xl">Pizzify</p>
            <img src={Pizzalogo} alt="Pizza logo" className="w-16 mt-[-16px] h-16" />
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center gap-6 sm:gap-8">
            {isLoggedIn ? (
              <div className="relative">
                <BsPersonCircle
                  className="rounded-full w-10 h-10 cursor-pointer hover:text-[#FF9110]"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ul className="absolute top-full sm:right-[-100px] right-[-100px] sm:mt-2 mt-9 bg-tran rounded-md z-[1] w-36 p-2 shadow">
                    <li>
                      <Link
                        to="/user/profile"
                        className="hover:text-[#FF9110] rounded-md font-semibold hover:bg-orange-200 block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/order/me"
                        className="hover:text-[#FF9110] rounded-md font-semibold hover:bg-orange-200 block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/add-product"
                        className="hover:text-[#FF9110] rounded-md font-semibold hover:bg-orange-200 block px-4 py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Add-Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover:text-[#FF9110] rounded-md font-semibold hover:bg-orange-200 block px-4 py-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/auth/login" className="hover:text-[#FF9110] lg:pr-[100px]">
                Login
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/cart">
                <div>
                  <img src={CartIcon} className="w-8 h-8 inline" alt="Cart" />
                  <p className="text-black inline sm:pr-[70px] md:pr-[100px]">{cartsData?.items?.length}</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center sm:flex-row sm:pl-[100px]  gap-4 mt-2 sm:mt-[-35px]">
          <Link to="/menu" className="hover:text-[#FF9110]">
            Menu
          </Link>
          <Link to="/services" className="hover:text-[#FF9110]">
            Services
          </Link>
          <Link to="/about" className="hover:text-[#FF9110]">
            About
          </Link>
        </div>
      </nav>

      {children}

      <Footer />
    </div>
  );
}

export default Layout;
