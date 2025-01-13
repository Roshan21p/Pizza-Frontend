import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getMyOrders } from "../../Redux/Slices/OrderSlice";
import Layout from "../../Layouts/Layout";
import { FaEye, FaPrint } from "react-icons/fa"; // Import icons from react-icons

function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.order?.ordersData);

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  const handleViewOrder = (orderId) => {
    toast.success(`Viewing order ID: ${orderId}`);
    // Add logic to show order details, e.g., open a modal or redirect to a new page.
  };

  const handleDownloadInvoice = (orderId) => {
    toast.success(`Downloading invoice for order ID: ${orderId}`);
    // Add logic to download invoice, e.g., API call to get PDF.
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;  // Return formatted as dd-mm-yyyy
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 bg-gradient-to-r from-amber-50 to-orange-300 min-h-screen">
        <h1 className="text-2xl text-[#FF9110] text-center font-bold mb-6">My Orders</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full  bg-gray-100 border border-blue-300 rounded-lg shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b  border-r border-blue-300 text-left">Order ID</th>
                <th className="py-2 px-4 border-b  border-r border-blue-300 text-left">Date</th>
                <th className="py-2 px-4 border-b border-r border-blue-300 text-left">Total</th>
                <th className="py-2 px-4 border-b border-r border-blue-300 text-left">Status</th>
                <th className="py-2 px-4 border-b border-r border-blue-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 px-4 border-b  border-r border-blue-300">{order._id}</td>
                  <td className="py-2 px-4 border-b  border-r border-blue-300">{formatDate(order.createdAt)}</td>
                  <td className="py-2 px-4 border-b  border-r border-blue-300">₹{order.totalPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b  border-r border-blue-300">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === "DELIVERED"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-r border-blue-300">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleViewOrder(order._id)}
                      >
                        <FaEye className="inline-block w-4 h-4 mr-1" />
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => handleDownloadInvoice(order._id)}
                      >
                        <FaPrint className="inline-block w-4 h-4 mr-1" />
                      </button>
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
