import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Edit2, Trash2, Loader, CheckCircle, XCircle } from 'lucide-react';
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
import { useDatabase, type Service } from '@/hooks/use-database';

const AdminServices = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const { getServices, createService, updateService, isLoading, error } = useDatabase();

  const [services, setServices] = useState<Service[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    price_range: '',
    status: 'active',
  });

  const canManageServices = hasPermission('services_edit');

  useEffect(() => {
    const fetchServices = async () => {
      setIsFetching(true);
      const data = await getServices();
      setServices(data);
      setIsFetching(false);
    };
    fetchServices();
  }, [getServices]);

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: '',
      price_range: '',
      status: 'active',
    });
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.slug || !formData.description) {
      toast({
        title: 'Missing Fields',
        description: 'Name, slug, and description are required',
        variant: 'destructive',
      });
      return;
    }

    const newService = await createService({
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      icon: formData.icon || null,
      price_range: formData.price_range || null,
      status: formData.status,
    });

    if (newService) {
      setServices([newService, ...services]);
      resetForm();
      setIsCreateOpen(false);
      toast({
        title: 'Service Created',
        description: `${formData.name} has been added`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create service',
        variant: 'destructive',
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedService) return;

    const updated = await updateService(selectedService.id, {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      icon: formData.icon || null,
      price_range: formData.price_range || null,
      status: formData.status,
    });

    if (updated) {
      setServices(services.map((s) => (s.id === selectedService.id ? updated : s)));
      setIsEditOpen(false);
      setSelectedService(null);
      resetForm();
      toast({
        title: 'Service Updated',
        description: 'Service has been updated successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update service',
        variant: 'destructive',
      });
    }
  };

  const handleToggleStatus = async (service: Service) => {
    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    const updated = await updateService(service.id, { status: newStatus });
    if (updated) {
      setServices(services.map((s) => (s.id === service.id ? updated : s)));
      toast({
        title: 'Status Updated',
        description: `Service is now ${newStatus}`,
      });
    }
  };

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      icon: service.icon || '',
      price_range: service.price_range || '',
      status: service.status,
    });
    setIsEditOpen(true);
  };

  const ServiceForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Web Development"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g., web-development"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the service..."
          rows={3}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon">Icon (Lucide icon name)</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., Code"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="price_range">Price Range</Label>
          <Input
            id="price_range"
            value={formData.price_range}
            onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
            placeholder="e.g., $500 - $2000"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
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
              <Briefcase className="w-8 h-8" />
              Services Management
            </h2>
            <p className="text-muted-foreground">Manage the services displayed on your website</p>
          </div>

          {canManageServices && (
            <Button onClick={() => { resetForm(); setIsCreateOpen(true); }} className="gap-2">
              <Plus className="w-5 h-5" />
              Add Service
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
            <span>Loading services...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">/{service.slug}</p>
                    </div>
                  </div>
                  {canManageServices && (
                    <button
                      onClick={() => openEditDialog(service)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>

                {service.price_range && (
                  <p className="text-sm font-medium text-primary mb-4">{service.price_range}</p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    {service.status === 'active' ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                        <XCircle size={14} />
                        Inactive
                      </span>
                    )}
                  </div>
                  {canManageServices && (
                    <button
                      onClick={() => handleToggleStatus(service)}
                      className="text-xs text-primary hover:underline"
                    >
                      Toggle
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {services.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No services found</p>
                {canManageServices && (
                  <Button onClick={() => setIsCreateOpen(true)} variant="outline">
                    Create your first service
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
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <ServiceForm onSubmit={handleCreate} submitLabel="Create Service" />
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <ServiceForm onSubmit={handleUpdate} submitLabel="Update Service" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
