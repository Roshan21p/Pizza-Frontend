import { useNavigate } from 'react-router-dom';
import Layout from '../../Layouts/Layout';

function OrderFailure() {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="text-gray-600 body-font bg-gradient-to-r from-amber-50 to-orange-300 min-h-screen">
        <div className="container px-5 py-12 mx-auto">
          {/* Order Failure Header */}
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-6">
              Order Failed
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-2">
              Unfortunately, your order could not be processed. Please try again.
            </p>
          </div>

          {/* Failure Details Section */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-50 to-pink-300 p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700">What Happened?</h2>
            <p className="text-gray-600 mt-4">
              Your payment might not have been completed successfully or there could have been a
              technical issue. Please check your payment method and try again. If the issue
              persists, contact our support team for assistance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => navigate('/checkout')}
              className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default OrderFailure;
