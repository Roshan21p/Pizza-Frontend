import { useNavigate } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { placeOrder } from '../../Redux/Slices/OrderSlice';

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartsData } = useSelector((state) => state.cart);

  const [details, setDetails] = useState({
    paymentMethod: 'OFFLINE',
    address: {
      flat: '',
      area: '',
      landmark: '',
      pincode: '',
      city: '',
      state: ''
    }
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setDetails({
      ...details,
      address: {
        ...details.address, // Spread the previous address properties
        [name]: value // Update the specific field
      }
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (details.paymentMethod === '' || details.address === '') {
      toast.error('Please fill all the fields');
      return;
    }

    if (!details.address.pincode.match(/^[1-9][0-9]{5}$/)) {
      toast.error('Invalid pincode. Enter a 6-digit number starting from 1-9.');
      return;
    }

    const response = await dispatch(placeOrder());
    console.log('Order response', response);

    if (response?.payload?.data?.success) {
      toast.success('Order placed successfully');
      navigate('/order/success');
    } else {
      toast.error('Something went wrong cannot place the order');
    }
  }

  return (
    <Layout>
      <section className="text-gray-600 body-font min-h-56 bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Thanks for Choosing Us{' '}
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Total Price -
              <span className="font-bold text-red-500">
                ₹{' '}
                {cartsData?.items?.length === 0
                  ? ''
                  : cartsData?.items?.reduce(
                      (acc, item) => acc + item?.quantity * item?.product?.price,
                      0
                    )}
              </span>
            </p>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="relative flex-grow  w-full">
              <label
                htmlFor="paymentMethod"
                className="text-2xl leading-7 font-semibold text-gray-600"
              >
                Payment Method
              </label>
              <select
                name="paymentMethod"
                required
                onChange={handleUserInput}
                className="p-2 border rounded-md focus:outline-none  focus:border-yellow-500 bg-white text-gray-700 w-full"
              >
                <option value="OFFLINE">Offline</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>

            <div className="relative flex-grow w-full my-5 ">
              <div className="text-3xl font-semibold mb-3">Address</div>
              <div className="flex flex-col md:flex-row md:space-x-5">
                {/* Left Column */}
                <div className="flex flex-col w-full md:w-1/2 space-y-2">
                  <label htmlFor="flat" className="leading-7 text-sm text-gray-600">
                    Flat, House no, Building, Company, Apartment
                  </label>
                  <textarea
                    type="text"
                    required
                    name="flat"
                    onChange={handleUserInput}
                    value={details.address.flat}
                    className="w-full px-2 border mt-1 resize-none rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
                  />

                  <label htmlFor="area" className="leading-7 text-sm text-gray-600">
                    Area, Street, Sector, Village
                  </label>
                  <textarea
                    type="text"
                    required
                    name="area"
                    onChange={handleUserInput}
                    value={details.address.area}
                    className="w-full px-2  border resize-none rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
                  />

                  <label htmlFor="landmark" className="leading-7 text-sm text-gray-600">
                    Landmark
                  </label>
                  <textarea
                    type="text"
                    required
                    name="landmark"
                    placeholder="Eg. near pizza hotel"
                    onChange={handleUserInput}
                    value={details.address.landmark}
                    className="w-full px-2 border resize-none rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/2  space-y-2">
                  <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                    Pincode
                  </label>
                  <input
                    type="number"
                    required
                    name="pincode"
                    placeholder="Enter 6-digit Pincode."
                    onChange={handleUserInput}
                    value={details.address.pincode}
                    className="w-full px-2 border py-3 rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
                  />

                  <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                    Town/City
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    onChange={handleUserInput}
                    value={details.address.city}
                    className="w-full px-2 py-3 border rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
                  />

                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    name="state"
                    placeholder="Enter your state"
                    onChange={handleUserInput}
                    value={details.address.state}
                    className="w-full px-2 py-3 border rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
                  />
                </div>
              </div>
            </div>

            <button className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-lg">
              Place Order
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
