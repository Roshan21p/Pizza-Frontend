import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Layout from './Layout';

function AdminLayout({ children }) {
  return (
    <Layout>
      <div className="min-h-[80vh] bg-gradient-to-r from-amber-50 to-orange-300">
        <Sidebar />
        <Link
          to={'/admin/dashboard'}
          className="block text-center text-2xl sm:text-3xl sm:pl-[100px] lg:pl-[5px] font-semibold text-[#FF9110] pt-2"
        >
          Admin Dashboard
        </Link>
        {children}
      </div>
    </Layout>
  );
}

export default AdminLayout;
