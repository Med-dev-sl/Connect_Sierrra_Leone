import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit2, Trash2, Shield, Mail, Loader } from 'lucide-react';
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
import { useAuth } from '@/hooks/use-auth';
import { useDatabase, type User } from '@/hooks/use-database';
import { ROLES } from '@/lib/rbac';
import type { UserRole } from '@/lib/rbac';

export const AdminUsers = () => {
  const { toast } = useToast();
  const { user: currentUser, hasPermission } = useAuth();
  const { getUsers, updateUser, deleteUser, isLoading, error } = useDatabase();
  
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'viewer' as UserRole,
  });

  const canManageUsers = hasPermission('users_edit');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);
      const data = await getUsers();
      setUsers(data);
      setIsFetching(false);
    };
    fetchUsers();
  }, [getUsers]);

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const updated = await updateUser(selectedUser.id, {
        name: formData.name,
        role: formData.role,
      });
      
      if (updated) {
        setUsers(users.map((u) => (u.id === selectedUser.id ? updated : u)));
        setIsEditOpen(false);
        setSelectedUser(null);
        toast({
          title: 'User Updated',
          description: 'User information has been updated',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const success = await deleteUser(userId);
      if (success) {
        setUsers(users.filter((u) => u.id !== userId));
        toast({
          title: 'User Deleted',
          description: 'User has been removed from the system',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete user',
          variant: 'destructive',
        });
      }
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    });
    setIsEditOpen(true);
  };

  const getRoleColor = (role: string): string => {
    const colors: Record<string, string> = {
      admin: 'bg-red-500/10 text-red-700 dark:text-red-400',
      moderator: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      editor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      viewer: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    };
    return colors[role] || colors.viewer;
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
        </motion.div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin mr-2" />
            <span>Loading users...</span>
          </div>
        ) : (
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden md:table-cell">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => {
                    const role = ROLES[user.role as UserRole] || ROLES.viewer;
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
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                            <Shield className="w-4 h-4" />
                            {role.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-500/10 text-green-700' : 'bg-gray-500/10 text-gray-700'}`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {canManageUsers && (
                              <>
                                <button
                                  onClick={() => openEditDialog(user)}
                                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  disabled={user.id === currentUser?.id}
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

            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No users found</p>
              </div>
            )}
          </motion.div>
        )}

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
                  disabled
                  className="mt-1 bg-muted border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
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
                <Button onClick={handleUpdateUser} className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update User'}
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
