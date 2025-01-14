import { useNavigate } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { states } from '../../Constants/states';

function Order() {
  const navigate = useNavigate();
  const { cartsData } = useSelector((state) => state.cart);
  // const { flat, area, landmark, pincode, city, state } = useSelector((state) => state?.auth?.data?.address);
  const address = useSelector((state) => state?.auth?.data?.address);

  const totalPrice = cartsData?.items?.reduce(
    (acc, item) => acc + item?.quantity * item?.product?.price,
    0
  );

  const [details, setDetails] = useState({
    paymentMethod: 'CARD',
    address: {
      flat: '',
      area: '',
      landmark: '',
      pincode: '',
      city: '',
      state: ''
    }
  });

  useEffect(() => {
    if (address) {
      setDetails((prev) => ({
        ...prev,
        address: {
          flat: address.flat || '',
          area: address.area || '',
          landmark: address.landmark || '',
          pincode: address.pincode || '',
          city: address.city || '',
          state: address.state || ''
        }
      }));
    }
  }, []);

  function handleUserInput(e) {
    const { name, value } = e.target;
    if (name === 'paymentMethod') {
      setDetails((prevDetails) => ({
        ...prevDetails,
        paymentMethod: value
      }));
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          [name]: value
        }
      }));
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (
      !details.address.flat ||
      !details.address.area ||
      !details.address.landmark ||
      !details.address.city ||
      !details.address.state
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    if (!details.address.pincode.match(/^[1-9][0-9]{5}$/)) {
      toast.error('Invalid pincode. Enter a 6-digit number starting from 1-9.');
      return;
    }

    // Navigate to the payment page with order details
    navigate('/checkout', { state: { orderDetails: details, totalPrice } });
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
                ₹ {cartsData?.items?.length === 0 ? '' : totalPrice}
              </span>
            </p>
          </div>

          <form noValidate onSubmit={handleFormSubmit}>
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
                value={details.paymentMethod}
                onChange={handleUserInput}
                className="p-2 border rounded-md focus:outline-none  focus:border-yellow-500 bg-white text-gray-700 w-full"
              >
                <option value="CARD">Card - VISA, MasterCard</option>
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
                  <select
                    type="text"
                    required
                    name="state"
                    placeholder="Enter your state"
                    onChange={handleUserInput}
                    value={details.address.state}
                    className="w-full px-2 py-3 border rounded-md focus:outline-none focus:border-yellow-500 bg-white text-gray-700"
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
