import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../Redux/Slices/OrderSlice';
import Layout from '../../Layouts/Layout';
import { FaEye } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom';
import { formatDate } from '../../Helpers/formatDate';

function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.order?.ordersData);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  return (
    <Layout>
      <div className="text-gray-600 mx-auto p-4 bg-gradient-to-r from-amber-50 to-orange-300 min-h-screen">
        <h1 className="text-2xl text-[#FF9110] text-center font-bold mb-6">My Orders</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 border-2 border-[#FF9110] rounded-lg shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-2 border-r border-[#FF9110] text-left">Order ID</th>
                <th className="py-2 px-4 border-2 border-r border-[#FF9110] text-left">Date</th>
                <th className="py-2 px-4 border-2 border-r border-[#FF9110] text-left">Total</th>
                <th className="py-2 px-4 border-2 border-r border-[#FF9110] text-left">Status</th>
                <th className="py-2 px-4 border-2 border-r border-[#FF9110] text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order?._id}>
                  <td className="py-2 px-4 border-2   border-[#FF9110]">{order?._id}</td>
                  <td className="py-2 px-4 border-2  border-[#FF9110]">
                    {formatDate(order?.createdAt)}
                  </td>
                  <td className="py-2 px-4 border-2 border-[#FF9110]">
                    ₹{order?.totalPrice?.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-2  border-[#FF9110]">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === 'DELIVERED'
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-2 border-[#FF9110]">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/order/${order?._id}`}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        <FaEye className=" w-10 h-6 mr-1" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders?.length === 0 && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">You have no orders yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyOrders;
