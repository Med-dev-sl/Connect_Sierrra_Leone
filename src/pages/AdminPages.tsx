'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import useAdminAuth from '@/hooks/use-admin-auth';
import { useDatabase, type Page } from '@/hooks/use-database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Plus, CheckCircle, Clock, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPages() {
  const { user, hasPermission } = useAdminAuth();
  const { getPages, createPage, updatePage, deletePage, isLoading, error } = useDatabase();
  
  const [pages, setPages] = useState<Page[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    status: 'draft' as 'draft' | 'published',
  });

  const canManagePages = hasPermission('pages_edit');

  // Fetch pages on mount
  useEffect(() => {
    const fetchPages = async () => {
      setIsFetching(true);
      const data = await getPages();
      setPages(data);
      setIsFetching(false);
    };
    fetchPages();
  }, [getPages]);

  const handleCreate = async () => {
    if (!formData.title || !formData.slug) {
      toast.error('Title and URL slug are required');
      return;
    }

    const newPage = await createPage({
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      meta_description: formData.meta_description,
      status: formData.status,
      author_id: user?.id,
      view_count: 0,
      is_homepage: formData.slug === '/',
      template_type: 'default',
    });

    if (newPage) {
      setPages([newPage, ...pages]);
      setFormData({ title: '', slug: '', content: '', meta_description: '', status: 'draft' });
      setIsCreateOpen(false);
      toast.success('Page created successfully');
    } else {
      toast.error('Failed to create page');
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      meta_description: page.meta_description || '',
      status: page.status as 'draft' | 'published',
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingPage || !formData.title || !formData.slug) {
      toast.error('Title and URL slug are required');
      return;
    }

    const updated = await updatePage(editingPage.id, {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      meta_description: formData.meta_description,
      status: formData.status,
    });

    if (updated) {
      setPages(pages.map((p) => (p.id === editingPage.id ? updated : p)));
      setEditingPage(null);
      setFormData({ title: '', slug: '', content: '', meta_description: '', status: 'draft' });
      setIsEditOpen(false);
      toast.success('Page updated successfully');
    } else {
      toast.error('Failed to update page');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      const success = await deletePage(id);
      if (success) {
        setPages(pages.filter((p) => p.id !== id));
        toast.success('Page deleted successfully');
      } else {
        toast.error('Failed to delete page');
      }
    }
  };

  const handleToggleStatus = async (page: Page) => {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    const updated = await updatePage(page.id, {
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
    });
    if (updated) {
      setPages(pages.map((p) => (p.id === page.id ? updated : p)));
      toast.success(`Page ${newStatus} successfully`);
    }
  };

  const getDisplayStatus = (status: string): 'draft' | 'published' => {
    if (status === 'published') return 'published';
    return 'draft';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Website Pages</h1>
          <p className="text-muted-foreground">Manage your website pages and content</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {canManagePages && (
          <div className="mb-6">
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={16} />
                  New Page
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Page</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      placeholder="Page title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">URL Slug</label>
                    <Input
                      placeholder="/page-slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Meta Description</label>
                    <Input
                      placeholder="SEO meta description"
                      value={formData.meta_description}
                      onChange={(e) =>
                        setFormData({ ...formData, meta_description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      placeholder="Page content (HTML supported)"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={5}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          status: value as 'draft' | 'published',
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreate} className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Page'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin mr-2" />
            <span>Loading pages...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{page.title}</h3>
                    <div className="flex gap-2">
                      {canManagePages && (
                        <>
                          <button
                            onClick={() => handleEdit(page)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(page.id)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{page.slug}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {page.meta_description || page.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      {page.status === 'published' ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                          <CheckCircle size={14} />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                          <Clock size={14} />
                          Draft
                        </span>
                      )}
                    </div>
                    {canManagePages && (
                      <button
                        onClick={() => handleToggleStatus(page)}
                        className="text-xs text-primary hover:underline"
                      >
                        Toggle
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No pages found</p>
                {canManagePages && (
                  <Button onClick={() => setIsCreateOpen(true)} variant="outline">
                    Create your first page
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        {isEditOpen && editingPage && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Page title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL Slug</label>
                  <Input
                    placeholder="/page-slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Meta Description</label>
                  <Input
                    placeholder="SEO meta description"
                    value={formData.meta_description}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Page content (HTML supported)"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={5}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as 'draft' | 'published',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleUpdate} className="w-full" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Page'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
}
