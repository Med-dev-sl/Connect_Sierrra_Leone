import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit2, Trash2, Shield, Mail } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import useAdminAuth from '@/hooks/use-admin-auth';
import useLovableCloud from '@/hooks/use-lovable-cloud';
import type { LovableUser } from '@/lib/lovable';
import type { UserRole } from '@/lib/rbac';
import { ROLES } from '@/lib/rbac';

// Mock users
const mockUsers: LovableUser[] = [
  {
    id: 'user-1',
    email: 'admin@connectsl.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-27',
  },
  {
    id: 'user-2',
    email: 'moderator@connectsl.com',
    name: 'John Moderator',
    role: 'moderator',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-25',
  },
  {
    id: 'user-3',
    email: 'editor@connectsl.com',
    name: 'Sarah Editor',
    role: 'editor',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-27',
  },
];

export const AdminUsers = () => {
  const { toast } = useToast();
  const { user: currentUser, hasPermission } = useAdminAuth();
  const { getUsers, createUser, updateUser, deleteUser } = useLovableCloud();
  
  const [users, setUsers] = useState<LovableUser[]>(mockUsers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LovableUser | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'viewer' as UserRole,
  });

  const canManageUsers = hasPermission('users_edit');

  const handleCreateUser = async () => {
    if (!formData.email || !formData.name) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newUser: LovableUser = {
        id: 'user-' + Date.now(),
        email: formData.email,
        name: formData.name,
        role: formData.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);
      setFormData({ email: '', name: '', role: 'viewer' });
      setIsCreateOpen(false);

      toast({
        title: 'User Created',
        description: `${formData.name} has been added as ${formData.role}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create user',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? { ...u, email: formData.email, name: formData.name, role: formData.role }
            : u
        )
      );
      setIsEditOpen(false);
      setSelectedUser(null);

      toast({
        title: 'User Updated',
        description: 'User information has been updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter((u) => u.id !== userId));
      toast({
        title: 'User Deleted',
        description: 'User has been removed from the system',
      });
    }
  };

  const openEditDialog = (user: LovableUser) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
    });
    setIsEditOpen(true);
  };

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
              <Users className="w-8 h-8" />
              User Management
            </h2>
            <p className="text-muted-foreground">Manage team members and their access levels</p>
          </div>

          {canManageUsers && (
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <Plus className="w-5 h-5" />
              Add User
            </Button>
          )}
        </motion.div>

        {/* Users Table */}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden md:table-cell">Joined</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => {
                  const role = ROLES[user.role];
                  const roleColors: Record<string, string> = {
                    admin: 'bg-red-500/10 text-red-700',
                    moderator: 'bg-blue-500/10 text-blue-700',
                    editor: 'bg-purple-500/10 text-purple-700',
                    viewer: 'bg-gray-500/10 text-gray-700',
                  };

                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${roleColors[user.role]}`}>
                          <Shield className="w-4 h-4" />
                          {role.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm hidden md:table-cell">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {canManageUsers && (
                            <>
                              <button
                                onClick={() => openEditDialog(user)}
                                disabled={!canManageUsers}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={user.id === currentUser?.id || !canManageUsers}
                                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Create User Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new team member account</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  className="mt-1 bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-1 bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Object.entries(ROLES).map(([key, role]) => (
                    <option key={key} value={key}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} className="flex-1">
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information and role</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="edit-name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="edit-role" className="text-sm font-medium">
                  Role
                </Label>
                <select
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Object.entries(ROLES).map(([key, role]) => (
                    <option key={key} value={key}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleUpdateUser} className="flex-1">
                  Update User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
