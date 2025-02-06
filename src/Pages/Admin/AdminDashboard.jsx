import { useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPayments } from '../../Redux/Slices/StripeSlice';
import { Bar } from 'react-chartjs-2';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function AdminDashboard() {
  const dispatch = useDispatch();
  const { monthlyPayments = {}, totalAmount = 0 } = useSelector((state) => state?.stripe);
  const totalOrders = monthlyPayments ? Object.keys(monthlyPayments).reduce((sum, data) => sum + (monthlyPayments[data]?.count || 0), 0) : 0

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  const salesData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Orders / Month',
        data: monthlyPayments
          ? Object.keys(monthlyPayments).map((month) => monthlyPayments[month]?.count || 0)
          : [],
        backgroundColor: '#4F46E5',
        yAxisID: 'y1', // Use a unique axis for count
      },
      {
        label: 'Amount / Month',
        data: monthlyPayments
          ? Object.keys(monthlyPayments).map((month) => monthlyPayments[month]?.amount || 0)
          : [],
        backgroundColor: '#22C55E',
        yAxisID: 'y2', // Use a unique axis for amount
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto  p-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center mb-6">
        </h1>

        <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
          {monthlyPayments && Object.keys(monthlyPayments).length > 0 ? (
            <div className="w-full h-[400px]">
              <Bar
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y1: {
                      beginAtZero: true,
                      position: 'left', // Orders on the left axis
                    },
                    y2: {
                      beginAtZero: true,
                      position: 'right', // Amounts on the right axis
                      grid: {
                        drawOnChartArea: false, // Hides grid lines for right axis
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-lg text-center">Loading sales data...</p>
          )}
        </div>
        <div className="flex justify-center gap-6 mt-6 text-lg sm:text-2xl">
          <button className=" bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-6 py-3 rounded-lg font-semibold shadow-md">
            Total Orders: {totalOrders}
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-6 py-3 rounded-lg font-semibold shadow-md">
            Total Amount: ₹{totalAmount}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
