import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with Supabase queries
const mockQuotes: Quote[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+232 76 123 456',
    company: 'Tech Corp',
    service: 'Software Development',
    budget: '$5000-$10000',
    message: 'Looking for a custom web application',
    status: 'pending',
    createdAt: '2025-01-27',
    updatedAt: '2025-01-27',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+232 76 234 567',
    company: 'Design Studio',
    service: 'Graphic Design',
    budget: '$1000-$5000',
    message: 'Brand identity and logo design',
    status: 'reviewed',
    createdAt: '2025-01-26',
    updatedAt: '2025-01-26',
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-700', icon: Clock },
  reviewed: { label: 'Reviewed', color: 'bg-blue-500/10 text-blue-700', icon: Eye },
  quoted: { label: 'Quoted', color: 'bg-green-500/10 text-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-500/10 text-red-700', icon: AlertCircle },
};

export const QuotesTable = () => {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter quotes
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || quote.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedQuotes = filteredQuotes.slice(startIdx, startIdx + itemsPerPage);

  const handleStatusChange = (quoteId: string, newStatus: Quote['status']) => {
    setQuotes(
      quotes.map((q) =>
        q.id === quoteId ? { ...q, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : q
      )
    );
  };

  const handleDelete = (quoteId: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      setQuotes(quotes.filter((q) => q.id !== quoteId));
    }
  };

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedQuote) {
      console.log('Sending reply to:', selectedQuote.email, replyMessage);
      // TODO: Integrate with email service
      setReplyMessage('');
      setIsReplyOpen(false);
      alert('Reply sent to ' + selectedQuote.email);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-background border-border"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="quoted">Quoted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Total Quotes', value: filteredQuotes.length, color: 'bg-blue-500/10 text-blue-700' },
          {
            label: 'Pending',
            value: filteredQuotes.filter((q) => q.status === 'pending').length,
            color: 'bg-yellow-500/10 text-yellow-700',
          },
          {
            label: 'Quoted',
            value: filteredQuotes.filter((q) => q.status === 'quoted').length,
            color: 'bg-green-500/10 text-green-700',
          },
          {
            label: 'Rejected',
            value: filteredQuotes.filter((q) => q.status === 'rejected').length,
            color: 'bg-red-500/10 text-red-700',
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-lg ${stat.color} border border-current border-opacity-20`}
          >
            <p className="text-sm font-medium opacity-75">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden md:table-cell">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden lg:table-cell">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden sm:table-cell">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedQuotes.length > 0 ? (
                paginatedQuotes.map((quote) => {
                  const StatusIcon = statusConfig[quote.status].icon;
                  return (
                    <motion.tr
                      key={quote.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">{quote.name}</td>
                      <td className="px-6 py-4 text-muted-foreground hidden md:table-cell text-sm">{quote.email}</td>
                      <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell text-sm">{quote.service}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[quote.status].color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig[quote.status].label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell text-sm">{quote.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedQuote(quote);
                              setIsDetailOpen(true);
                            }}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedQuote(quote);
                              setIsReplyOpen(true);
                            }}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            title="Send Reply"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(quote.id)}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No quotes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredQuotes.length)} of{' '}
              {filteredQuotes.length} quotes
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>View and manage quote information</DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote.budget}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Message</p>
                <p className="text-foreground mt-2 p-4 rounded-lg bg-muted whitespace-pre-wrap">{selectedQuote.message}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as Quote['status'])}
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="quoted">Quoted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="flex-1">
                  Close
                </Button>
                <Button className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Reply</DialogTitle>
            <DialogDescription>Send a response to {selectedQuote?.email}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">To</p>
              <p className="text-lg font-semibold text-foreground mt-1">{selectedQuote?.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Message</label>
              <Textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                className="mt-2 bg-background border-border min-h-[200px]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsReplyOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSendReply} disabled={!replyMessage.trim()} className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotesTable;
