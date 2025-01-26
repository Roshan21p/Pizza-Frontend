import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../Layouts/AdminLayout';
import { useEffect } from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { formatDate } from '../../Helpers/formatDate';
import { getAllOrders } from '../../Redux/Slices/OrderSlice';

function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.order?.ordersData);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  return (
    <AdminLayout>
      <div className="text-gray-600 mx-auto p-4 sm:w-[90%] lg:w-[80%] ">
        <h1 className="text-2xl font-semibold text-center text-[#6B7280] mb-6">
          Total Orders : {orders ? orders?.length : '0'}
        </h1>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-gray-100 border-2 border-[#FF9110]">
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
                        state={{ from: '/admin/all-orders' }}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        <MdOutlineModeEdit className=" w-10 h-6 mr-1" />
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
    </AdminLayout>
  );
}

export default AllOrders;
