import { useDispatch } from "react-redux";
import Layout from "../../Layouts/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import { isEmail } from "../../Helpers/regexMatcher";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    console.log(email);
    

    async function onFormSubmit(e){
        e.preventDefault();

        if(!email){
            toast.error("Email field is required");
            return;
        }

        if(!isEmail(email)){
            toast.error("Invalid email id");
            return;
        }

        await dispatch(forgotPassword(email));
        setEmail('');
    }
  return (
    <Layout>
            {/* Forgot password container */}
      <div className="flex items-center justify-center  min-h-[90vh] bg-gradient-to-r from-amber-50 to-orange-300 px-10 py-6 mx-auto">
        {/* Forgot password card*/}
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-4 bg-gray-100 w-[20rem] sm:w-[24rem] h-[24rem]"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-500">Forgot Password</h1>

          <p className="text-gray-500">
            Enter your registered email, we will send you a verification link on your registered
            email from which you can reset your password
          </p>

          <div className="flex flex-col gap-1">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your registered email"
              className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="w-full px-8 py-2 text-lg text-white bg-yellow-500 border-0 rounded focus:outline-none hover:bg-yellow-600"
            type="submit"
          >
            Get Verification Link
          </button>

          <p className="mt-3 text-xs text-center text-gray-500">
            Already have an account ?{' '}
            <Link to={'/auth/login'} className="text-yellow-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default ForgotPassword