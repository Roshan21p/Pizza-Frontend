import Sidebar from '../Components/Sidebar';
import Layout from './Layout';

function AdminLayout({ children }) {
  return (
    <Layout>
      <div className="min-h-[80vh] bg-gradient-to-r from-amber-50 to-orange-300">
        <Sidebar />
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#FF9110] pt-2 ">
          Admin Dashboard
        </h1>
        {children}
      </div>
    </Layout>
  );
}

export default AdminLayout;
