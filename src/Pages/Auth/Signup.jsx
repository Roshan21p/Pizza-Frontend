import { useState } from 'react';
import toast from 'react-hot-toast';
import SignUpPresentation from './SignupPresentation';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { isEmail, isValidMobNumber, isValidPassword } from '../../Helpers/regexMatcher';

// Container for the Signup page
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: ''
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpState({
      ...signUpState,
      [name]: value
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); // prevent the form reloading the page

    // Add validations for the form input
    if (
      !signUpState.email ||
      !signUpState.mobileNumber ||
      !signUpState.password ||
      !signUpState.firstName ||
      !signUpState.lastName
    ) {
      toast.error('Missing values from the form');
      // alert('Please fill all the fields');
      return;
    }

    if (signUpState.firstName.length < 5 || signUpState.firstName.length > 20) {
      toast.error('First name should be atleast 5 characters long and maximum 20 characters long ');
      return;
    }

    if (signUpState.lastName.length < 5 || signUpState.lastName.length > 20) {
      toast.error('lastt name should be atleast 5 characters long and maximum 20 characters long ');
      return;
    }

    // email validation using regex
    if (!isEmail(signUpState.email)) {
      toast.error('Invalid email id');
      return;
    }

    // password validation using regex
    if (!isValidPassword(signUpState.password)) {
      toast.error(
        'Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol'
      );
      return;
    }

    if (!isValidMobNumber(signUpState.mobileNumber)) {
      toast.error('Please enter a valid Indian mobile number (10 digits).');
      return;
    }

    const apiResponse = await dispatch(createAccount(signUpState));
    console.log('API Response is ', apiResponse);
    if (apiResponse?.payload?.data?.success) {
      navigate('/auth/login');
    }
    setSignUpState({
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      password: ''
    });
    return;
  }

  return (
    <SignUpPresentation
      handleFormSubmit={handleFormSubmit}
      handleUserInput={handleUserInput}
      signUpState={signUpState}
    />
  );
}

export default Signup;
