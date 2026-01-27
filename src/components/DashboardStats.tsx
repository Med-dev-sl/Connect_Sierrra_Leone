import { motion } from 'framer-motion';
import {
  TrendingUp,
  MessageSquare,
  Users,
  Calendar,
} from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

const stats: StatCard[] = [
  {
    icon: <MessageSquare className="w-8 h-8" />,
    label: 'Total Quotes',
    value: '48',
    change: '+12% from last month',
    trend: 'up',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    label: 'Quote Conversion',
    value: '65%',
    change: '+5% from last month',
    trend: 'up',
  },
  {
    icon: <Users className="w-8 h-8" />,
    label: 'Unique Customers',
    value: '32',
    change: '+8% from last month',
    trend: 'up',
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    label: 'This Month',
    value: '12',
    change: 'New quotes received',
    trend: 'up',
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">{stat.icon}</div>
            {stat.trend === 'up' && (
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
          <p className="text-muted-foreground text-xs mt-2">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
