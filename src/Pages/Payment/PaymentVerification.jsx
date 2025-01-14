import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { verifyPayment } from '../../Redux/Slices/StripeSlice'; // Import your Redux action for verifying payment

function PaymentVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyPaymentStatus() {
      try {
        // Extract session_id from the URL
        const urlParams = new URLSearchParams(location.search);
        const session_id = urlParams.get('session_id');

        if (!session_id) {
          toast.error('Payment session ID not found. Redirecting to failure page...');
          navigate('/order/failure');
          return;
        }

        console.log('session_id', session_id);

        // Dispatch the verifyPayment action to check the payment status
        const response = await dispatch(verifyPayment({ session_id }));

        if (response?.payload?.success) {
          toast.success('Payment successfully verified!');
          navigate('/order/success', { state: { orderDetails: response.payload.data } });
        } else {
          toast.error('Payment verification failed. Please try again.');
          navigate('/order/failure');
        }
      } catch (error) {
        console.error('Error during payment verification:', error);
        toast.error('An unexpected error occurred during payment verification.');
        navigate('/order/failure');
      } finally {
        setIsLoading(false);
      }
    }

    verifyPaymentStatus();
  }, [dispatch, location.search, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-amber-50 to-orange-300">
      {isLoading ? (
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Verifying Your Payment</h1>
          <p className="text-gray-600 mt-2">
            Please wait while we verify your payment. This may take a few seconds.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mt-6"></div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Redirecting to the appropriate page...</p>
      )}
    </div>
  );
}

export default PaymentVerification;
