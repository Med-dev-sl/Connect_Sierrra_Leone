import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Edit2, Trash2, Loader, CheckCircle, Clock, XCircle } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useDatabase, type Testimonial } from '@/hooks/use-database';

const AdminTestimonials = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const { getTestimonials, createTestimonial, updateTestimonial, isLoading, error } = useDatabase();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_company: '',
    client_avatar: '',
    content: '',
    rating: 5,
    featured: false,
    status: 'pending',
  });

  const canManage = hasPermission('quotes_edit'); // Using quotes permission for testimonials

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsFetching(true);
      const data = await getTestimonials();
      setTestimonials(data);
      setIsFetching(false);
    };
    fetchTestimonials();
  }, [getTestimonials]);

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_company: '',
      client_avatar: '',
      content: '',
      rating: 5,
      featured: false,
      status: 'pending',
    });
  };

  const handleCreate = async () => {
    if (!formData.client_name || !formData.content) {
      toast({
        title: 'Missing Fields',
        description: 'Client name and content are required',
        variant: 'destructive',
      });
      return;
    }

    const newTestimonial = await createTestimonial({
      client_name: formData.client_name,
      client_company: formData.client_company || null,
      client_avatar: formData.client_avatar || null,
      content: formData.content,
      rating: formData.rating,
      featured: formData.featured,
      status: formData.status,
    });

    if (newTestimonial) {
      setTestimonials([newTestimonial, ...testimonials]);
      resetForm();
      setIsCreateOpen(false);
      toast({
        title: 'Testimonial Added',
        description: 'Testimonial has been created successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create testimonial',
        variant: 'destructive',
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedTestimonial) return;

    const updated = await updateTestimonial(selectedTestimonial.id, {
      client_name: formData.client_name,
      client_company: formData.client_company || null,
      client_avatar: formData.client_avatar || null,
      content: formData.content,
      rating: formData.rating,
      featured: formData.featured,
      status: formData.status,
    });

    if (updated) {
      setTestimonials(testimonials.map((t) => (t.id === selectedTestimonial.id ? updated : t)));
      setIsEditOpen(false);
      setSelectedTestimonial(null);
      resetForm();
      toast({
        title: 'Testimonial Updated',
        description: 'Testimonial has been updated successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update testimonial',
        variant: 'destructive',
      });
    }
  };

  const handleApprove = async (testimonial: Testimonial) => {
    const updated = await updateTestimonial(testimonial.id, { status: 'approved' });
    if (updated) {
      setTestimonials(testimonials.map((t) => (t.id === testimonial.id ? updated : t)));
      toast({
        title: 'Testimonial Approved',
        description: 'Testimonial is now visible on the website',
      });
    }
  };

  const handleReject = async (testimonial: Testimonial) => {
    const updated = await updateTestimonial(testimonial.id, { status: 'rejected' });
    if (updated) {
      setTestimonials(testimonials.map((t) => (t.id === testimonial.id ? updated : t)));
      toast({
        title: 'Testimonial Rejected',
        description: 'Testimonial has been rejected',
      });
    }
  };

  const handleToggleFeatured = async (testimonial: Testimonial) => {
    const updated = await updateTestimonial(testimonial.id, { featured: !testimonial.featured });
    if (updated) {
      setTestimonials(testimonials.map((t) => (t.id === testimonial.id ? updated : t)));
      toast({
        title: updated.featured ? 'Featured' : 'Unfeatured',
        description: `Testimonial is ${updated.featured ? 'now featured' : 'no longer featured'}`,
      });
    }
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_company: testimonial.client_company || '',
      client_avatar: testimonial.client_avatar || '',
      content: testimonial.content,
      rating: testimonial.rating || 5,
      featured: testimonial.featured || false,
      status: testimonial.status,
    });
    setIsEditOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="flex items-center gap-1 text-xs font-medium text-green-600"><CheckCircle size={14} />Approved</span>;
      case 'rejected':
        return <span className="flex items-center gap-1 text-xs font-medium text-red-600"><XCircle size={14} />Rejected</span>;
      default:
        return <span className="flex items-center gap-1 text-xs font-medium text-yellow-600"><Clock size={14} />Pending</span>;
    }
  };

  const TestimonialForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client_name">Client Name</Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="client_company">Company</Label>
          <Input
            id="client_company"
            value={formData.client_company}
            onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
            placeholder="Acme Inc."
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="content">Testimonial Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="What did the client say..."
          rows={4}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4"
        />
        <Label htmlFor="featured">Featured on homepage</Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }} className="flex-1">
          Cancel
        </Button>
        <Button onClick={onSubmit} className="flex-1" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <Star className="w-8 h-8" />
              Testimonials
            </h2>
            <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
          </div>

          {canManage && (
            <Button onClick={() => { resetForm(); setIsCreateOpen(true); }} className="gap-2">
              <Plus className="w-5 h-5" />
              Add Testimonial
            </Button>
          )}
        </motion.div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin mr-2" />
            <span>Loading testimonials...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-card border rounded-lg p-6 ${testimonial.featured ? 'border-primary' : 'border-border'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.client_name}</h3>
                    {testimonial.client_company && (
                      <p className="text-sm text-muted-foreground">{testimonial.client_company}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {testimonial.featured && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">Featured</span>
                    )}
                    {canManage && (
                      <button
                        onClick={() => openEditDialog(testimonial)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < (testimonial.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  {getStatusBadge(testimonial.status)}
                  
                  {canManage && (
                    <div className="flex items-center gap-2">
                      {testimonial.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(testimonial)}
                            className="text-xs text-green-600 hover:underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(testimonial)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleToggleFeatured(testimonial)}
                        className="text-xs text-primary hover:underline"
                      >
                        {testimonial.featured ? 'Unfeature' : 'Feature'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {testimonials.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No testimonials found</p>
                {canManage && (
                  <Button onClick={() => setIsCreateOpen(true)} variant="outline">
                    Add your first testimonial
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <TestimonialForm onSubmit={handleCreate} submitLabel="Create Testimonial" />
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
            </DialogHeader>
            <TestimonialForm onSubmit={handleUpdate} submitLabel="Update Testimonial" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
