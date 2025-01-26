import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../Redux/Slices/OrderSlice';
import Layout from '../../Layouts/Layout';
import { formatDate } from '../../Helpers/formatDate';
import generateInvoice from '../../Components/Invoice';

function OrderDetails() {
  const { orderId } = useParams();
  const [newStatus, setNewStatus] = useState('');
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const { isLoggedIn, role, data } = useSelector((state) => state?.auth);

  const pathname = useLocation().state?.from;
  console.log('pathname', pathname);

  console.log('order', orderDetails, orderId);

  async function fetchOrderDetails() {
    const response = await dispatch(getOrderById(orderId));
    console.log('response', response);
    setOrderDetails(response?.payload?.data?.data);
  }

  async function handleStatusChange() {
    if (!newStatus) {
      alert('Please select a status before updating.');
      return;
    }
    const response = await dispatch(updateOrderStatus({ orderId, status: newStatus }));
    if (response?.payload?.data?.success) {
      setNewStatus('');
      fetchOrderDetails();
    } 
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  return (
    <Layout>
      <div className="text-gray-600 mx-auto p-4 bg-gradient-to-r from-amber-50 to-orange-300 min-h-screen">
        <h1 className="text-center text-[#FF9110] font-bold text-xl">Order Details</h1>
        <div className="rounded-lg p-6  text-center">
          <h2 className="text-xl mb-4">
            <strong>Order Id:</strong> <span>{orderDetails?._id}</span>{' '}
          </h2>
          <p className="mb-2">
            <strong>Date:</strong> {formatDate(orderDetails?.createdAt)}
          </p>
          <p className="mb-2">
            <strong>Total Price:</strong> ₹{orderDetails?.totalPrice?.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {orderDetails?.status}
          </p>
          <p className="mb-2">
            <strong>Payment Status:</strong> {orderDetails?.payment}
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Shipping Address</h3>
          <p>
            {orderDetails?.address?.flat}, {orderDetails?.address?.area}
          </p>
          <p>{orderDetails?.address?.landmark}</p>
          <p>
            {orderDetails?.address?.city}, {orderDetails?.address?.state}
          </p>
          <p>
            {orderDetails?.address?.pincode}, {}
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full md:w-3/4 lg:w-2/3 mx-auto  border-2 border-[#FF9110] rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-2 border-2 border-r border-[#FF9110] text-left">
                    Product
                  </th>
                  <th className="py-2 px-2 border-2 border-r border-[#FF9110] text-left">
                    Quantity
                  </th>
                  <th className="py-2 px-2 border-2 border-r border-[#FF9110] text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.items?.map((item, index) => (
                  <tr key={item?.product?._id || index}>
                    <td className="py-2 px-2 border-2  border-[#FF9110] text-left underline">
                      <Link to={`/product/${item?.product?._id}`}>
                        {item?.product?.productName}
                      </Link>
                    </td>
                    <td className="py-2 px-2 border-2  border-[#FF9110] text-left">
                      {item?.quantity}
                    </td>
                    <td className="py-2 px-2 border-2  border-[#FF9110] text-left">
                      ₹{item?.quantity * item?.product?.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isLoggedIn && role === 'ADMIN' && pathname === '/admin/all-orders' ? (
            <div className="mt-4 flex flex-col items-center justify-center ">
              <label htmlFor="status" className="block text-lg  font-semibold text-gray-700">
                Change Order Status:
              </label>
              <select
                id="status"
                 value={newStatus}
                 onChange={(e) => setNewStatus(e.target.value)}
                className="mt-4 py-2 px-4 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value='OUT_FOR_DELIVERY'> Out_For_Delivery</option>
              </select>

              <button
                 onClick={handleStatusChange}
                className="bg-blue-500 mt-4 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Status
              </button>
            </div>
          ) : (
            <button
              onClick={() => generateInvoice(orderDetails, data)}
              className="bg-green-500 mt-2 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download Invoice
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
