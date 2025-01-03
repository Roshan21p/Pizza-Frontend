import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import { BsPersonCircle } from 'react-icons/bs';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const { flat, area, landmark, pincode, city, state } = userData?.address || {} ;


  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-amber-50 to-orange-300 px-4 py-6 md:px-8">
        <div className="flex flex-col rounded-lg gap-6 my-10 shadow-lg max-w-[56rem] mx-auto p-6">
          {/* Profile Header */}
          <h1 className="font-bold text-center text-[#6B7280] hover:text-[#FF9110] text-2xl md:text-3xl">My Profile</h1>

          {/* Profile Picture */}
          <div className="relative mx-auto">
            {userData?.avatar ? (
              <img
                src={userData?.avatar}
                alt="User profile image"
                className="w-40 h-40 rounded-full border border-gray-300 shadow-md"
              />
            ) : (
              <BsPersonCircle className="w-40 h-40 rounded-full border-none bg-gray-300 shadow-md" />
            )}
          </div>

          {/* User Info */}
          <h3 className="text-lg sm:text-xl font-semibold capitalize text-center">
          <span className="font-bold text-[#6B7280]">Name:</span> {userData?.firstName} {userData?.lastName}
          </h3>

          <div className="font-semibold  text-center text-sm sm:text-base md:text-lg space-y-2 mx-auto w-full sm:w-2/3">
            <p>
              <span className="font-bold text-[#6B7280]">Email:</span> {userData?.email}
            </p>
            <p>
              <span className="font-bold text-[#6B7280]">Mobile Number:</span> {userData?.mobileNumber}
            </p>
            {
                userData?.address?.flat ? (<p>
                    <span className="font-bold text-[#6B7280]">Address: </span>
                    {flat} {area} {landmark}{' '}
                    {pincode} {city} {state}
                  </p>) : ("")
            }
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="font-semibold text-lg px-6 py-2 border text-white bg-yellow-500 rounded focus:outline-none hover:bg-yellow-600 cursor-pointer w-full sm:w-1/2">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
