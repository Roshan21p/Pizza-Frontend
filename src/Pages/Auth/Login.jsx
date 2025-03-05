import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slices/AuthSlice';
import LoginPresentation from './LoginPresentation';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); // prevent the form reloading the page

    // Add validations for the form input
    if (!loginData.email || !loginData.password) {
      toast.error('Missing values from the form');
      return;
    }

    setLoading(true); // Disable button while request is in progress

    const apiResponse = await dispatch(login(loginData));
    setLoading(false); // Re-enable button after request completes

    if (apiResponse?.payload?.data?.success) {
      navigate('/');
      setLoginData({
        email: '',
        password: ''
      });
      return;
    }
  }
  return (
    
    <LoginPresentation
      handleFormSubmit={handleFormSubmit}
      handleUserInput={handleUserInput}
      loginData={loginData}
      loading={loading}
    />
  );
}

export default Login;
