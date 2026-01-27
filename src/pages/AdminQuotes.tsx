import AdminLayout from '@/components/AdminLayout';
import QuotesTable from '@/components/QuotesTable';

const AdminQuotes = () => {
  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Quote Management</h2>
          <p className="text-muted-foreground">View, manage, and respond to customer quote requests</p>
        </div>

        <QuotesTable />
      </div>
    </AdminLayout>
  );
};

export default AdminQuotes;
