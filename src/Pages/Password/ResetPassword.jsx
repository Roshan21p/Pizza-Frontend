import { useState } from 'react';
import Layout from '../../Layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { isValidPassword } from '../../Helpers/regexMatcher';
import { resetPassword } from '../../Redux/Slices/AuthSlice';

function ResetPasssword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: '',
    cnfPassword: '',
    resetToken: useParams().resetToken
  });

  console.log(data);
  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.password || !data.cnfPassword || !data.resetToken) {
      toast.error('Please fill all the fields.');
      return;
    }

    // password validation using regex
    if (!isValidPassword(data.password)) {
      toast.error(
        'Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol'
      );
      return;
    }

    // matching the password
    if (data.password !== data.cnfPassword) {
      toast.error('Both password should be same');
      return;
    }

    const apiResponse = await dispatch(resetPassword(data));
    console.log();
    
    if(apiResponse?.payload?.data?.success){
        navigate('/auth/login');

        setData({
            password: '',
            cnfPassword: '',
            resetToken: '',
        })
    }
  }
  return (
    <Layout>
      {/* Reset password container */}
      <div className="flex items-center justify-center  min-h-[90vh] bg-gradient-to-r from-amber-50 to-orange-300 px-10 py-6 mx-auto">
        {/* Reset password card*/}
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-4 bg-gray-100 w-[20rem] sm:w-[24rem] h-[24rem]"
        >
          <h1 className="text-center text-2xl font-bold text-[#FF9110]">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              value={data.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              required
              type="password"
              name="cnfPassword"
              id="cnfPassword"
              placeholder="Confirm your new password"
              className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              value={data.cnfPassword}
              onChange={handleUserInput}
            />
          </div>

          <button
            className="w-full px-8 py-2 text-lg text-white bg-yellow-500 border-0 rounded focus:outline-none hover:bg-yellow-600"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ResetPasssword;
