import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import DashboardStats from '@/components/DashboardStats';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar } from 'lucide-react';

// Mock data
const quotesTrendData = [
  { name: 'Week 1', quotes: 4, converted: 3 },
  { name: 'Week 2', quotes: 3, converted: 2 },
  { name: 'Week 3', quotes: 8, converted: 5 },
  { name: 'Week 4', quotes: 7, converted: 5 },
  { name: 'Week 5', quotes: 9, converted: 6 },
  { name: 'Week 6', quotes: 12, converted: 8 },
];

const serviceBreakdown = [
  { name: 'Software Development', value: 18, color: '#3b82f6' },
  { name: 'Graphic Design', value: 12, color: '#a855f7' },
  { name: 'Phone Unlock', value: 8, color: '#10b981' },
  { name: 'Computer Solutions', value: 10, color: '#f97316' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            January 27, 2025
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-12">
          <DashboardStats />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card border border-border rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Quote Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={quotesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="quotes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Service Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Service Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {serviceBreakdown.map((service) => (
                <div key={service.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                  <span className="text-muted-foreground">{service.name}</span>
                  <span className="ml-auto font-semibold text-foreground">{service.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New quote from John Smith', time: '2 hours ago', type: 'new' },
              { action: 'Quote approved for Tech Corp', time: '5 hours ago', type: 'approved' },
              { action: 'Reply sent to sarah@example.com', time: '1 day ago', type: 'reply' },
              { action: 'Quote rejected from ABC Inc', time: '2 days ago', type: 'rejected' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'new'
                      ? 'bg-blue-500'
                      : activity.type === 'approved'
                        ? 'bg-green-500'
                        : activity.type === 'reply'
                          ? 'bg-purple-500'
                          : 'bg-red-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-foreground font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
