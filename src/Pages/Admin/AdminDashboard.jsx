import AdminLayout from '../../Layouts/AdminLayout';

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center mt-40">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#6B7280] pt-2">Sales Data</h1>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
