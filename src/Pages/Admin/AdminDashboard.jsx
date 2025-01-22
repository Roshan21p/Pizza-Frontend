import Sidebar from "../../Components/Sidebar";
import Layout from "../../Layouts/Layout";


function AdminDashboard() {
  
  return (
    <Layout>
        <div className="flex justify-center min-h-[80vh] bg-gradient-to-r from-amber-50 to-orange-300">
        <Sidebar />
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#FF9110] mt-2 sm:pl-40">Admin Dashboard</h1>
        
    </div>
    </Layout>
  );
}

export default AdminDashboard;
