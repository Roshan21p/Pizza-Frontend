import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import OrderSuccessImage from "../../assets/Images/ordered-success.png";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderDetails } = location.state || {};

  return (
    <Layout>
      <section className="text-gray-600 body-font bg-gradient-to-r from-amber-50 to-orange-300 min-h-screen">
        <div className="container px-5 py-12 mx-auto">
          {/* Order Success Header */}
          <div className="flex flex-col text-center w-full mb-8">
            <img
              width={400}
              height={400}
              src={OrderSuccessImage}
              alt="Order Success"
              className="border rounded-lg w-[15rem]  sm:w-[20rem] mx-auto"
            />
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-6">
              Order Successfully Placed
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-2">
              Thank you for your purchase! Your order is confirmed.
            </p>
          </div>

          {/* Order Summary Section */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r  from-green-50 to-teal-100 p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">Order Summary</h2>
            <div className="text-gray-600 mt-4 space-y-2">
              <p>
                <strong>Order ID:</strong> {orderDetails?.orderId || "N/A"}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{orderDetails?.totalPrice || "0.00"}
              </p>
              <p>
                <strong>Shipping Address:</strong>
              </p>
              {orderDetails?.address ? (
                <>
                  <p>{orderDetails?.address?.flat || "N/A"}</p>
                  <p>{orderDetails?.address?.area || "N/A"}</p>
                  <p>
                    {orderDetails?.address?.city || "N/A"},{" "}
                    {orderDetails?.address?.state || "N/A"} -{" "}
                    {orderDetails?.address?.pincode || "N/A"}
                  </p>
                </>
              ) : (
                <p>No address provided.</p>
              )}
            </div>

            {/* Ordered Items Section */}
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-700">Items:</h3>
              {orderDetails?.items?.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {orderDetails?.items.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item.price_data.product_data.name} (x{item.quantity}) - ₹{(item.price_data.unit_amount / 100).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No items available.</p>
              )}
            </div>
          </div>

          {/* Go Back Home Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default OrderSuccess;
