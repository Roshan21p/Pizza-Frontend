import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { createCheckoutSession } from "../../Redux/Slices/StripeSlice";
import { useDispatch } from "react-redux";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract order details and total price from the state
  const { orderDetails, totalPrice } = location.state || {};
  

  // Handle missing data
  useEffect(() => {
    if (!orderDetails || !totalPrice) {
      toast.error("Order details are missing. Redirecting to the order page...");
      navigate("/order");
    }

    
  }, [orderDetails, totalPrice]);

  async function handlePayment(){
     // Create a checkout session via the backend
     try {
        const response = await dispatch(
          createCheckoutSession({
            address: orderDetails.address,
            paymentMethod: orderDetails.paymentMethod,
          })
        );        
        
        if (response?.payload?.success) {
          // Redirect to Stripe Checkout
          const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
          
          const { sessionId } = response.payload;
          
          const { error } = await stripe.redirectToCheckout({ sessionId });
          
          if (error) {
            toast.error(error.message);
          }
        }
      } catch (error) {
        toast.error("Payment session creation failed. Please try again.");
      }
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font bg-gradient-to-r from-amber-50 to-orange-300 min-h-screen">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Checkout Page
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Review your order and proceed to payment
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-lg shadow-md">
            {/* Order Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-700">Order Summary</h2>
              <p className="text-gray-600">
                Total Price:{" "}
                <span className="font-bold text-red-500">₹ {totalPrice}</span>
              </p>
            </div>

            {/* Address Details */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-700">Shipping Address</h2>
              <p className="text-gray-600">Flat: {orderDetails?.address?.flat}</p>
              <p className="text-gray-600">Area: {orderDetails?.address?.area}</p>
              <p className="text-gray-600">Landmark: {orderDetails?.address?.landmark}</p>
              <p className="text-gray-600">Pincode: {orderDetails?.address?.pincode}</p>
              <p className="text-gray-600">City: {orderDetails?.address?.city}</p>
              <p className="text-gray-600">State: {orderDetails?.address?.state}</p>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-700">Payment Method</h2>
              <p className="text-gray-600">{orderDetails?.paymentMethod}</p>
            </div>

            {/* Proceed to Payment Button */}
            <div className="flex justify-center">
              <button
                onClick={handlePayment}
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Checkout;
