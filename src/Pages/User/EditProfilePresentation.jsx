import { BsPencil, BsPersonCircle } from 'react-icons/bs';
import Layout from '../../Layouts/Layout';
import { states } from '../../Constants/states';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function EditProfilePresentation({ handleInputChange, handleImageUpload, onFormSubmit, data }) {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-amber-50 to-orange-300 px-4 py-6 md:px-8">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center rounded-lg gap-4 my-10 shadow-lg max-w-[56rem] mx-auto p-6"
        >
          {/* Profile Header */}
          <h1 className="font-bold text-center text-[#6B7280] hover:text-[#FF9110] text-2xl md:text-3xl">
            Edit Profile
          </h1>

          {/* Profile Picture */}
          <div className="relative mx-auto">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {data?.previewImage ? (
                <img
                  src={data?.previewImage}
                  alt="User profile image"
                  className="w-40 h-40 rounded-full border border-gray-300 shadow-md"
                />
              ) : (
                <BsPersonCircle className="w-40 h-40 rounded-full border-none bg-gray-300 shadow-md" />
              )}
            </label>
            <input
              onChange={handleImageUpload}
              className="hidden"
              id="image_uploads"
              name="image_uploads"
              type="file"
              accept=".jpg, .jpeg, .png"
            />

            {/* Edit Icon */}
            <button className="absolute right-1 bottom-[-10px] p-2 rounded-full  transition-all">
              <div className="w-10 h-10 flex items-center border-2 bg-yellow-500 justify-center rounded-full">
                <BsPencil size={20} color="black" onChange={handleImageUpload} />
              </div>
            </button>
          </div>

          <div className="relative flex-grow w-full mt-2">
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div className="flex flex-col w-full md:w-1/2 space-y-2">
                {/* Left Column */}
                <label htmlFor="firstname" className="text-lg font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="w-full bg-transparent border-2 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
                  value={data?.firstName || ''}
                  onChange={handleInputChange}
                />
                <label htmlFor="email" className="text-lg font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-200 border-2 border-gray-500 px-2 py-1 rounded-md text-gray-500 cursor-not-allowed"
                  value={data?.email}
                  disabled
                />
              </div>

              {/*Right column*/}
              <div className="flex flex-col w-full md:w-1/2  space-y-2">
                <label htmlFor="lastname" className="text-lg font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="w-full bg-transparent border-2 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
                  value={data?.lastName || ''}
                  onChange={handleInputChange}
                />
                <label htmlFor="mobileNumber" className="text-lg font-semibold">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Enter 10 digit mobile number"
                  className="w-full bg-transparent border-2 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
                  value={data?.mobileNumber || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="relative flex-grow w-full">
            <div className="text-3xl font-semibold mb-3">Address</div>
            <div className="flex flex-col md:flex-row md:space-x-5">
              {/* Left Column */}
              <div className="flex flex-col w-full md:w-1/2 space-y-2">
                <label htmlFor="flat" className="leading-7 text-sm text-gray-600">
                  Flat, House no, Building, Apartment
                </label>
                <textarea
                  type="text"
                  name="flat"
                  onChange={handleInputChange}
                  value={data?.address?.flat || ''}
                  className="w-full px-2 border-2 border-gray-500 py-1 mt-1 resize-none rounded-md focus:outline-none focus:border-yellow-500 bg-transparent  text-gray-700"
                />

                <label htmlFor="area" className="leading-7 text-sm text-gray-600">
                  Area, Street, Sector, Village
                </label>
                <textarea
                  type="text"
                  name="area"
                  onChange={handleInputChange}
                  value={data?.address?.area || ''}
                  className="w-full px-2 border-2 border-gray-500 py-1 mt-1 resize-none rounded-md focus:outline-none focus:border-yellow-500 bg-transparent  text-gray-700"
                />

                <label htmlFor="landmark" className="leading-7 text-sm text-gray-600">
                  Landmark
                </label>
                <textarea
                  type="text"
                  name="landmark"
                  placeholder="Eg. near pizza hotel"
                  onChange={handleInputChange}
                  value={data?.address?.landmark || ''}
                  className="w-full px-2 border-2 border-gray-500 bg-transparent py-1  resize-none rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
                />
              </div>

              {/*Right column*/}
              <div className="flex flex-col w-full md:w-1/2  space-y-2">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                  Pincode
                </label>
                <input
                  type="number"
                  name="pincode"
                  placeholder="Enter 6-digit Pincode."
                  onChange={handleInputChange}
                  value={data?.address?.pincode || ''}
                  className="w-full border-2 border-gray-500 px-2 py-1 md:py-4 bg-transparent rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
                />

                <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                  Town/City
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleInputChange}
                  value={data?.address?.city || ''}
                  className="w-full border-2 border-gray-500 px-2 py-1 md:py-4 bg-transparent rounded-md focus:outline-none focus:border-yellow-500  text-gray-700"
                />

                <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="w-full border-2 border-gray-500 px-2 py-1  md:py-4 bg-transparent rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
                  onChange={handleInputChange}
                  value={data?.address?.state || ''}
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Link to={'/user/profile'}>
            <p className="underline cursor-pointer flex items-center justify-center w-full gap-2 text-green-700 hover:text-green-500">
              <AiOutlineArrowLeft className="text-green-700 hover:text-green-500" />
              Back to Profile
            </p>
          </Link>

          {/* Buttons */}
          <button className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-lg">
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditProfilePresentation;
