import { useEffect, useState } from 'react';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function AdminDashboard() {
  const dispatch = useDispatch();

  // State for date range
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date());

  console.log(startDate.toISOString());

  // Functio to format date YYYY-MM-DD (ISO format)
  function formatDate(date) {
    date ? date.toISOString().split('T')[0] : '';
    console.log(date);
    return date;
  }

  const handleFetchPayments = async () => {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startYear !== endYear) {
      toast.error('Start Year and End Year must be the same.');
      return; // Stop further execution
    }

    await dispatch(
      fetchAllPayments({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      })
    );
  };

  const { monthlyPayments = {}, totalAmount = 0 } = useSelector((state) => state?.stripe);
  const totalOrders = monthlyPayments
    ? Object.keys(monthlyPayments).reduce(
        (sum, data) => sum + (monthlyPayments[data]?.count || 0),
        0
      )
    : 0;

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        fetchAllPayments({ startDate: formatDate(startDate), endDate: formatDate(endDate) })
      );
    }
  }, []);

  const salesData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Orders / Month',
        data: monthlyPayments
          ? Object.keys(monthlyPayments).map((month) => monthlyPayments[month]?.count || 0)
          : [],
        backgroundColor: '#4F46E5',
        yAxisID: 'y1' // Use a unique axis for count
      },
      {
        label: 'Amount / Month',
        data: monthlyPayments
          ? Object.keys(monthlyPayments).map((month) => monthlyPayments[month]?.amount || 0)
          : [],
        backgroundColor: '#22C55E',
        yAxisID: 'y2' // Use a unique axis for amount
      }
    ]
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto  p-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center mb-6"></h1>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 mb-6">
          {/* Date Pickers in a Row on All Screens */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="flex flex-col  flex-1">
              <label className="text-gray-700 font-semibold">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MM-yyyy"
                className="w-full border-2 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd-MM-yyyy"
                className="w-full border-2 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:border-yellow-500 text-gray-700"
              />
            </div>
          </div>

          {/* Fetch Button Below Dates on Mobile */}
          <button
            className="text-white bg-yellow-500 border-0 px-4 py-2 mt-5 w-full sm:w-24 focus:outline-none hover:bg-yellow-700 rounded"
            onClick={handleFetchPayments}
          >
            Fetch
          </button>
        </div>

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
                      position: 'left' // Orders on the left axis
                    },
                    y2: {
                      beginAtZero: true,
                      position: 'right', // Amounts on the right axis
                      grid: {
                        drawOnChartArea: false // Hides grid lines for right axis
                      }
                    }
                  }
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
